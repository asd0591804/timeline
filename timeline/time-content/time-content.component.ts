import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { TimeRecord } from 'timeline/src/lib/timerecord';
import { TimeContentService } from './time-content.service';

@Component({
  selector: 'his-time-content',
  standalone: true,
  imports: [CommonModule,ListboxModule,FormsModule],
  templateUrl: './time-content.component.html',
  styleUrls: ['./time-content.component.css']
})
export class TimeContentComponent implements OnChanges{

  /** 時間軸點選資料的subrecord，讓其可以顯示在列表上
   * @type {TimeRecord[]}
   * @memberof TimeContentComponent
   */
  @Input() value!: TimeRecord[];

  /** 將在列表上點選的資料傳出
   * @memberof TimeContentComponent
   */
  @Output() choose:EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  selectedList!: TimeRecord;
  listDetail!: object[];

  #contentService: TimeContentService = inject(TimeContentService);

  ngOnChanges(): void {
    this.listDetail = this.#contentService.setInitial(this.value, this.listDetail);
  }

  onEmitFuntion(event: TimeRecord){
    const result = this.#contentService.getRecord(event, this.value);
    this.choose.emit(result);
  }



}
