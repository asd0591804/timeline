/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { TimelineSubject, TimeRecord } from 'timeline/src/lib/timeline.interface';
import '@his-base/array-extention';
import { TimeMenuService } from './time-menu.service';

@Component({
  selector: 'his-time-menu',
  standalone: true,
  imports: [CommonModule,PanelMenuModule,TimelineModule],
  templateUrl: './time-menu.component.html',
})
export class TimeMenuComponent implements OnInit {
  /** 傳入的資料
   * @type {TimeRecord[]}
   * @memberof TimeMenuComponent
   */
  @Input() value!: TimeRecord[];

  /** 傳給 time-content 的資料
   * @type {EventEmitter<TimeRecord[]>}
   * @memberof TimeMenuComponent
   */
  @Output() update: EventEmitter<TimeRecord[]> = new EventEmitter<TimeRecord[]>();

  yearMonthMenu!: MenuItem[];
  timelineRecord!: TimelineSubject[];

  #isMouseScrolling!: boolean;

  #timeMenuService: TimeMenuService = inject(TimeMenuService);

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.yearMonthMenu = this.#timeMenuService.getTimeMenu(this.value);

    this.timelineRecord = this.#timeMenuService.getTimelineRecord(this.value);
  }

  onTimelineSelect(selectedTime: TimelineSubject) {
    this.#timeMenuService.changeCss(selectedTime);

    const selectedRecord = this.#timeMenuService.getSelectedRecord(this.value, selectedTime);
    if (selectedRecord) {
      this.update.emit(selectedRecord.subRecord);
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
