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
  styleUrls: ['./time-menu.component.css']
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
  timelineRecord!: object[];

  #isMouseScrolling!: boolean;

  #timeMenuService: TimeMenuService = inject(TimeMenuService);

  constructor(private el: ElementRef) {}

  ngOnInit(): void {

    const sortedValue = this.#timeMenuService.sortTimeRecord(this.value);
    const groupedValue = this.#timeMenuService.groupbyTimeRecord(sortedValue);
    this.yearMonthMenu = this.#timeMenuService.getMenu(this.value, groupedValue);

    this.timelineRecord = this.#timeMenuService.getTimelineRecord(this.value);
  }

  onTimelineSelect(selectedTime: TimelineSubject) {
    this.#timeMenuService.changeCss(selectedTime);

    const foundRecord = this.#timeMenuService.findRecord(this.value, selectedTime);
    if (foundRecord) {
      this.update.emit(foundRecord.subRecord);
    }
  }

  onMouseOver() {
    this.#isMouseScrolling = true;
  }

  onMouseLeave() {
    this.#isMouseScrolling = false;
  }

  @HostListener('scroll', ['$event']) onElementScroll() {
    this.#timeMenuService.onElementScroll(this.el, this.value, this.#isMouseScrolling);
  }
}
