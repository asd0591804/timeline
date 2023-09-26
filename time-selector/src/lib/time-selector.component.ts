import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from "../../timeline/timeline.component";
import { TimeListComponent } from "../../time-list/time-list.component";
import { TimeRecord } from './timerecord';
import { TimeSelectorService } from './time-selector.service';

@Component({
    selector: 'his-time-selector',
    standalone: true,
    templateUrl: './time-selector.component.html',
    styles: [],
    imports: [CommonModule, TimelineComponent, TimeListComponent]
})
export class TimeSelectorComponent implements OnInit {

  @Input() record!: TimeRecord[];

  @Output() output = new EventEmitter();

  timelineOutputList!: TimeRecord[];

  #timeSelectorService: TimeSelectorService = inject(TimeSelectorService);
  ngOnInit(){
    this.timelineOutputList = this.#timeSelectorService.initList();
  }

  onUpdateRecord(record: TimeRecord[]){
    this.timelineOutputList = record;
  }

  onGetDetail(record: TimeRecord){
    this.output.emit(record);
  }

}
