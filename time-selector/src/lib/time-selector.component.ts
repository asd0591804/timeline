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

  /**
   * 輸入給timeline使用的資料
   * @type {TimeRecord[]}
   * @memberof TimeSelectorComponent
   */
  @Input() value!: TimeRecord[];

  /**
   * 輸出最終選擇的一筆資料
   * @memberof TimeSelectorComponent
   */
  @Output() selected:EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  timeList!: TimeRecord[];

  #timeSelectorService: TimeSelectorService = inject(TimeSelectorService);

  ngOnInit(){
    this.timeList = this.#timeSelectorService.initList();
  }

  onChangeTimeline(record: TimeRecord[]){
    this.timeList = record;
  }

  onChangeTimeList(record: TimeRecord){
    this.selected.emit(record);
  }

}
