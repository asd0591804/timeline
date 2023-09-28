/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { DetailData, TimeRecord } from 'time-selector/src/lib/timerecord';
import '@his-base/array-extention';
import { TimelineService } from './timeline.service';

@Component({
  selector: 'his-timeline',
  standalone: true,
  imports: [CommonModule,PanelMenuModule,TimelineModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit{
  /** 傳入的歷程資料
   * @type {TimeRecord[]}
   * @memberof TimelineComponent
   */
  @Input() value!: TimeRecord[];
  /** 發送給 timelist 的值
   * @memberof TimelineComponent
   */
  @Output() choose: EventEmitter<TimeRecord[]> = new EventEmitter<TimeRecord[]>();

  yearsMenu!: MenuItem[];
  timelineRecord!: object[];

  #inTimeline!: boolean;

  #timelineService:TimelineService = inject(TimelineService);

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.#timelineService.setInitRecord(this.value);

    const sortedTimes = this.#timelineService.sortTimeRecord(this.value);
    const groupedTimes = this.#timelineService.groupbyTimeRecord(sortedTimes);
    this.yearsMenu = this.#timelineService.getYearMonth(groupedTimes);

    this.timelineRecord = this.#timelineService.changeDataInTimeline();
  }

  onSelectTime(selectedTime: DetailData){
    this.#timelineService.changeCss(selectedTime);

    const filterRecord = this.#timelineService.findTarget(selectedTime);
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
    this.#timelineService.onElementScroll(this.el, this.#inTimeline);
  }
}
