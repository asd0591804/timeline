/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { DetailData, TimeRecord } from 'timeline/src/lib/timerecord';
import '@his-base/array-extention';
import { TimeMenuService } from './time-menu.service';

@Component({
  selector: 'his-time-menu',
  standalone: true,
  imports: [CommonModule,PanelMenuModule,TimelineModule],
  templateUrl: './time-menu.component.html',
  styleUrls: ['./time-menu.component.css']
})
export class TimeMenuComponent implements OnInit{
  /** 傳入的歷程資料
   * @type {TimeRecord[]}
   * @memberof TimeMenuComponent
   */
  @Input() value!: TimeRecord[];
  /** 發送給 time-content 的值
   * @memberof TimeMenuComponent
   */
  @Output() choose: EventEmitter<TimeRecord[]> = new EventEmitter<TimeRecord[]>();

  yearsMenu!: MenuItem[];
  timelineRecord!: object[];

  #inTimeline!: boolean;

  #menuService:TimeMenuService = inject(TimeMenuService);

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.#menuService.setInitRecord(this.value);

    const sortedTimes = this.#menuService.sortTimeRecord(this.value);
    const groupedTimes = this.#menuService.groupbyTimeRecord(sortedTimes);
    this.yearsMenu = this.#menuService.getYearMonth(groupedTimes);

    this.timelineRecord = this.#menuService.changeDataInTimeline();
  }

  onSelectTime(selectedTime: DetailData){
    this.#menuService.changeCss(selectedTime);

    const filterRecord = this.#menuService.findTarget(selectedTime);
    if(filterRecord){
      this.choose.emit(filterRecord.subrecord);
    }
  }

  onMouseOver(){
    this.#inTimeline = true;
  }

  onMouseLeave(){
    this.#inTimeline = false;
  }

  @HostListener('scroll', ['$event']) onElementScroll() {
    this.#menuService.onElementScroll(this.el, this.#inTimeline);
  }
}
