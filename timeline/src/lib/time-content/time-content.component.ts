import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { TimeContent, TimeRecord } from 'timeline/src/lib/timeline.interface';
import { TimeContentService } from './time-content.service';

@Component({
  selector: 'his-time-content',
  standalone: true,
  imports: [CommonModule,ListboxModule,FormsModule],
  templateUrl: './time-content.component.html',
  styleUrls: ['./time-content.component.css']
})
export class TimeContentComponent implements OnChanges {

  /** 時間軸點選資料的subrecord，讓其可以顯示在列表上
   * @type {TimeRecord[]}
   * @memberof TimeContentComponent
   */
  @Input() value!: TimeRecord[];

  /** 將在列表上點選的資料傳出
   * @type {EventEmitter<TimeRecord>}
   * @memberof TimeContentComponent
   */
  @Output() selected: EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  selectedContent!: TimeContent;
  timeContent!: TimeContent[];

  #timeContentService: TimeContentService = inject(TimeContentService);

  ngOnChanges(): void {
    this.timeContent = this.#timeContentService.getTimeContent(this.value, this.timeContent);
  }

  onContentSelect(timeContent: TimeContent) {
    const result = this.#timeContentService.getRecord(this.value, timeContent);
    this.selected.emit(result);
  }
}
