import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf, DatePipe } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
import '@his-base/data-extension';

@Component({
  selector: 'his-time-content',
  standalone: true,
  imports: [NgClass, NgIf, ListboxModule, FormsModule, DatePipe],
  templateUrl: './time-content.component.html',
  styles: [],
})
export class TimeContentComponent {

  /** 時間軸點選資料的 subRecords，讓其可以顯示在列表上 */
  @Input() value!: TimeItem[];

  /** 將在列表上點選的資料傳出 */
  @Output() contentSelect: EventEmitter<TimeItem> = new EventEmitter<TimeItem>();

  /** 選擇選單項目之一 */
  onContentClick(timeItem: TimeItem) {
    this.contentSelect.emit(timeItem);
  }
}
