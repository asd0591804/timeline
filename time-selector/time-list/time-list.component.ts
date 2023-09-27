import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { TimeRecord } from 'time-selector/src/lib/timerecord';
import { TimeListService } from './time-list.service';

@Component({
  selector: 'his-time-list',
  standalone: true,
  imports: [CommonModule,ListboxModule,FormsModule],
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnChanges{

  /**
   * 時間軸點選資料的subrecord，讓其可以顯示在列表上
   * @type {TimeRecord[]}
   * @memberof TimeListComponent
   */
  @Input() value!: TimeRecord[];

  /**
   * 將在列表上點選的資料傳出
   * @memberof TimeListComponent
   */
  @Output() choose:EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  selectedList!: TimeRecord;
  listDetail!: object[];

  #timeListService: TimeListService = inject(TimeListService);

  ngOnChanges(): void {
    this.listDetail = this.#timeListService.setInitial(this.value, this.listDetail);
  }

  onEmitFuntion(event: TimeRecord){
    const result = this.#timeListService.getRecord(event, this.value);
    this.choose.emit(result);
  }

}
