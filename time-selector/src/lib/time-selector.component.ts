import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from "../../timeline/timeline.component";
import { TimeListComponent } from "../../time-list/time-list.component";
import { TimeRecord } from './timerecord';
import { TimeSelectorService } from './time-selector.service';

@Component({
    selector: 'his-time-selector',
    standalone: true,
    template: `
    <div class="outside">
      <div class="forFlex">
        <his-timeline [diseaseRecord]="diseaseRecord" (list)="onUpdateRecord($event)"></his-timeline>
        <his-time-list [list]="timelineOutputList" (value)="onGetDetail($event)"></his-time-list>
      </div>
    </div>
  `,
    styles: [],
    imports: [CommonModule, TimelineComponent, TimeListComponent]
})
export class TimeSelectorComponent implements OnInit {
  diseaseRecord!: TimeRecord[];
  timelineOutputList!: TimeRecord[];

  #detailSelected!: TimeRecord;
  #timeSelectorService: TimeSelectorService = inject(TimeSelectorService);
  ngOnInit(){
    this.diseaseRecord = this.#timeSelectorService.setInitial();
    this.timelineOutputList = this.#timeSelectorService.initList();
  }

  onUpdateRecord(record: TimeRecord[]){
    this.timelineOutputList = record;
  }

  onGetDetail(record: TimeRecord){
    this.#detailSelected = record;
    console.log('Output is');
    console.log(this.#detailSelected);

  }

}
