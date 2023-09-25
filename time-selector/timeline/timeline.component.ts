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
  /**傳入的歷程資料 */
  @Input() diseaseRecord!: TimeRecord[];
  /**發送給 timelist 的值 */
  @Output() list = new EventEmitter();

  yearsMenu!: MenuItem[];
  timelineRecord!: object[];

  #inTimeline!: boolean;

  #timelineService:TimelineService = inject(TimelineService);

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.#timelineService.setInitRecord(this.diseaseRecord);

    const sortTimes = this.#timelineService.sortTimeRecord(this.diseaseRecord);
    const groupTimes = this.#timelineService.groupbyTimeRecord(sortTimes);
    this.yearsMenu = this.#timelineService.getYearMonth(groupTimes);
    this.timelineRecord = this.#timelineService.changeDataInTimeline();
  }

  onSelectTime(selectedTime: DetailData){
    const filterRecord = this.#timelineService.onSelectTime(selectedTime);
    if(filterRecord) this.list.emit(filterRecord.subrecord);
  }

  onCheckMouseIn(){
    this.#inTimeline = true;
  }
  onCheckMouseOut(){
    this.#inTimeline = false;
  }

  @HostListener('scroll', ['$event']) onElementScroll() {
    this.#timelineService.onElementScroll(this.el, this.#inTimeline);
  }
}
