import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeMenuComponent } from "../../time-menu/time-menu.component";
import { TimeContentComponent } from "../../time-content/time-content.component";
import { TimeRecord } from './timerecord';
import { TimelineService } from './timeline.service';

@Component({
    selector: 'his-timeline',
    standalone: true,
    templateUrl: './timeline.component.html',
    styles: [],
    imports: [CommonModule, TimeMenuComponent, TimeContentComponent]
})
export class TimelineComponent implements OnInit {

  /** 輸入給timeline使用的資料
   * @type {TimeRecord[]}
   * @memberof TimelineComponent
   */
  @Input() timeMenu!: TimeRecord[];

  /** 輸出最終選擇的一筆資料
   * @memberof TimelineComponent
   * 換成 content 動詞 primeng data emit
   */
  @Output() present:EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  timeContent!: TimeRecord[];

  #timelineService: TimelineService = inject(TimelineService);

  ngOnInit(){
    this.timeContent = this.#timelineService.initList();
  }

  onMenuChange(record: TimeRecord[]){
    this.timeContent = record;
  }

  onContentChange(record: TimeRecord){
    this.present.emit(record);
  }

}
