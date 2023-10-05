import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeMenuComponent } from "./time-menu/time-menu.component";
import { TimeContentComponent } from "./time-content/time-content.component";
import { TimeRecord } from './timeline.interface';

@Component({
    selector: 'his-timeline',
    standalone: true,
    templateUrl: './timeline.component.html',
    styles: [],
    imports: [CommonModule, TimeMenuComponent, TimeContentComponent]
})
export class TimelineComponent {

  /** 輸入給 time-menu 使用的資料
   * @type {TimeRecord[]}
   * @memberof TimelineComponent
   */
  @Input() timeMenu!: TimeRecord[];

  /** 輸出最終選擇的一筆資料
   * @type {EventEmitter<TimeRecord>}
   * @memberof TimelineComponent
   */
  @Output() deliver: EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  timeContent!: TimeRecord[];

  onContentUpdate(record: TimeRecord[]) {
    this.timeContent = record;
  }

  onRecordSelected(record: TimeRecord) {
    this.deliver.emit(record);
  }

}
