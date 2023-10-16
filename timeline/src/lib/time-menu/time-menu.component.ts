/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
import '@his-base/array-extention';
import { TimeMenuService } from './time-menu.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'his-time-menu',
  standalone: true,
  imports: [NgClass, NgIf, PanelMenuModule, TimelineModule],
  templateUrl: './time-menu.component.html',
  styles: [],
})
export class TimeMenuComponent implements OnInit {
  /** 傳入的資料 */
  @Input() value!: TimeItem[];

  /** 傳給 time-content 的資料 */
  @Output() menuSelect: EventEmitter<TimeItem[]> = new EventEmitter<TimeItem[]>();

  yearMonth!: MenuItem[];
  clickedId!: string;

  #isMouseScrolling!: boolean;

  #timeMenuService: TimeMenuService = inject(TimeMenuService);

  /** 為了滾動 timeline 畫面後帶動左邊 yearMonth 的功能而設定 */
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.yearMonth = this.#timeMenuService.getTimeMenu(this.value);
  }

  /** 點選了中間時間軸的項目 */
  onTimelineClick(timeItem: TimeItem) {
    this.clickedId = timeItem.id;
    this.menuSelect.emit(timeItem.subItems)
  }

  /** 當滑鼠移入時間軸 */
  onMouseOver() {
    this.#isMouseScrolling = true;
  }

  /** 當滑鼠移出時間軸 */
  onMouseLeave() {
    this.#isMouseScrolling = false;
  }

  /** 監聽是否有滑鼠滾動時間軸 */
  @HostListener('scroll', ['$event'])
  onTimelineScroll() {
    this.#timeMenuService.scrollTimeline(this.el, this.value, this.#isMouseScrolling);
  }

  /** 切換日期格式 */
  formatDate(date: Date){
    return date.formatString('MM-DD');
  }

  /** 確認當前 css */
  checkCss(timeItem: TimeItem) {
    return timeItem.id === this.clickedId;
  }
}
