import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { TimeContent, TimeRecord } from 'timeline/src/lib/timeline.interface';
import { TimeContentService } from './time-content.service';

@Component({
  selector: 'his-time-content',
  standalone: true,
  imports: [NgClass, NgIf, ListboxModule,FormsModule],
  templateUrl: './time-content.component.html',
  styles: [],
})
export class TimeContentComponent implements OnChanges {

  /** 時間軸點選資料的 subRecords，讓其可以顯示在列表上 */
  @Input() value!: TimeRecord[];

  /** 將在列表上點選的資料傳出 */
  @Output() selected: EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  selectedContent!: TimeContent;
  timeContents!: TimeContent[];

  #timeContentService: TimeContentService = inject(TimeContentService);

  ngOnChanges(): void {
    this.timeContents = this.#timeContentService.getTimeContents(this.value);
  }

  onContentClick(timeContent: TimeContent) {
    const result = this.#timeContentService.getSelectedRecord(this.value, timeContent);
    this.selected.emit(result);
  }
}
