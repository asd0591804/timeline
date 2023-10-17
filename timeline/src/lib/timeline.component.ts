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

  /** 時間紀錄
   * - 輸入給 time-menu 的資料
   */
  @Input() value!: TimeItem[];

  /** 輸出選擇的一筆資料 */
  @Output() timeSelect: EventEmitter<TimeItem> = new EventEmitter<TimeItem>();

  timeItems!: TimeItem[];

  /** 點選了中間時間軸的項目 */
  onMenuSelect(timeItems: TimeItem[]) {
    this.timeItems = timeItems;
  }

  /** 點選了右邊列表的項目 */
  onContentSelect(timeItem: TimeItem) {
    this.timeSelect.emit(timeItem);
  }

}
