import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeMenuComponent } from "./time-menu/time-menu.component";
import { TimeContentComponent } from "./time-content/time-content.component";
import { TimeItem } from './timeline.interface';

@Component({
    selector: 'his-timeline',
    standalone: true,
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    imports: [TimeMenuComponent, TimeContentComponent]
})
export class TimelineComponent {

  /** 輸入給 time-menu 使用的資料 */
  @Input() value!: TimeItem[];

  /** 輸出最終選擇的一筆資料 */
  @Output() timeSelect: EventEmitter<TimeItem> = new EventEmitter<TimeItem>();

  timeContents!: TimeItem[];

  /** 點選了時間軸的項目 */
  onMenuSelect(timeItems: TimeItem[]) {
    this.timeContents = timeItems;
  }

  /** 點選了右邊列表的項目 */
  onContentSelect(timeItem: TimeItem) {
    this.timeSelect.emit(timeItem);
  }

}
