/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
import { TimeMenuService } from './time-menu.service';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'his-time-menu',
  standalone: true,
  imports: [NgClass, NgIf, PanelMenuModule, TimelineModule, DatePipe],
  templateUrl: './time-menu.component.html',
  styles: [],
})
export class TimeMenuComponent implements OnInit {
  /** 時間紀錄 **/
  @Input() value!: TimeItem[];

  /** 點選 menu 觸發的事件 **/
  @Output() menuSelect: EventEmitter<TimeItem[]> = new EventEmitter<TimeItem[]>();

  yearMonths!: MenuItem[];
  selectedId!: string;

  #isMouseScroll!: boolean;

  #timeMenuService: TimeMenuService = inject(TimeMenuService);
  #elementRef: ElementRef = inject(ElementRef);

  /** 監聽是否有滑鼠滾動時間軸
   * - 處理畫面上的連動
   */
  @HostListener('scroll', ['$event'])
  onTimelineScroll() {
    this.#timeMenuService.scrollHandler(this.#elementRef, this.value, this.#isMouseScroll);
  }

  /** 初始化資料
   * - 年月轉換成左邊的菜單，可使用的資料(MenuItems)
   * - 排序 timeline 資料
   */
  ngOnInit(): void {
    this.value.sort((x, y) => x.time.getTime() - y.time.getTime());
    this.yearMonths = this.#timeMenuService.getYearMonths(this.value);

  }

  /** 點選了中間時間軸的項目
   * @param timeItem 點選的那筆紀錄
   */
  onTimelineClick(timeItem: TimeItem) {
    this.selectedId = timeItem.id;
    this.menuSelect.emit(timeItem.subItems)
  }

  /** 當滑鼠移入時間軸
   * - 設定滑鼠滾動狀態
   */
  onMouseOver() {
    this.#isMouseScroll = true;
  }

  /** 當滑鼠移出時間軸
   * - 設定滑鼠滾動狀態
   */
  onMouseLeave() {
    this.#isMouseScroll = false;
  }

  /** 確認是不是被點選的項目
   * @param timeItem 每一筆紀錄
   * @returns true: 是 / false: 否
   */
  isItemClick(timeItem: TimeItem) {
    return timeItem.id === this.selectedId;
  }
}
