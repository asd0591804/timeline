import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf, DatePipe } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
import '@his-base/data-extension';

@Component({
  selector: 'his-time-content',
  standalone: true,
  imports: [NgClass, NgIf, ListboxModule, DatePipe],
  templateUrl: './time-content.component.html',
  styles: [],
})
export class TimeContentComponent {

  /** 詳細記錄(subItems)，讓其可以顯示在列表上 */
  @Input() value!: TimeItem[];

  /** 點選 content 觸發的事件 */
  @Output() contentSelect: EventEmitter<TimeItem> = new EventEmitter<TimeItem>();

  /** 選擇選單項目之一 */
  onClick(timeItem: TimeItem) {
    this.contentSelect.emit(timeItem);
  }
}
