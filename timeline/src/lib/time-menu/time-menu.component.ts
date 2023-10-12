/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { TimelineSubject, TimeRecord } from 'timeline/src/lib/timeline.interface';
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
  @Input() value!: TimeRecord[];

  /** 傳給 time-content 的資料 */
  @Output() selected: EventEmitter<TimeRecord[]> = new EventEmitter<TimeRecord[]>();

  yearMonthMenu!: MenuItem[];
  timelineSubject!: TimelineSubject[];

  #isMouseScrolling!: boolean;

  #timeMenuService: TimeMenuService = inject(TimeMenuService);

  /** 為了滾動 timeline 畫面後帶動左邊 yearMonthMenu 的功能而設定 */
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.yearMonthMenu = this.#timeMenuService.getTimeMenu(this.value);

    this.timelineSubject = this.#timeMenuService.getTimelineSubject(this.value);
  }

  onTimelineClick(selectedTime: TimelineSubject) {
    this.#timeMenuService.switchSelectedCss(selectedTime);

    const selectedRecord = this.#timeMenuService.getSelectedRecord(this.value, selectedTime);
    if (selectedRecord) {
      this.selected.emit(selectedRecord.subRecords);
    }
  }

  onMouseOver() {
    this.#isMouseScrolling = true;
  }

  onMouseLeave() {
    this.#isMouseScrolling = false;
  }

  @HostListener('scroll', ['$event'])
  onTimelineScroll() {
    this.#timeMenuService.scrollTimeline(this.el, this.value, this.#isMouseScrolling);
  }
}
