import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeMenuComponent } from "./time-menu/time-menu.component";
import { TimeContentComponent } from "./time-content/time-content.component";
import { TimeRecord } from './timeline.interface';

@Component({
    selector: 'his-timeline',
    standalone: true,
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    imports: [TimeMenuComponent, TimeContentComponent]
})
export class TimelineComponent {

  /** 輸入給 time-menu 使用的資料 */
  @Input() value!: TimeRecord[];

  /** 輸出最終選擇的一筆資料 */
  @Output() selected: EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  timeContents!: TimeRecord[];

  onMenuSelect(subRecords: TimeRecord[]) {
    this.timeContents = subRecords;
  }

  onContentSelect(selectedRecord: TimeRecord) {
    this.selected.emit(selectedRecord);
  }

}
