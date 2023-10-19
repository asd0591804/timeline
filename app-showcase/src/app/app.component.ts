import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimelineComponent } from 'timeline/src/public-api';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
import { AppService } from './app.service';

@Component({
  selector: 'his-root',
  standalone: true,
  imports: [RouterOutlet, TimelineComponent],
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  value!: TimeItem[];

  #appService: AppService = inject(AppService);

  /** 初始化資料
   * - 向後端查詢 TimeItems
   */
  ngOnInit() {
    this.value = this.#appService.initial();
  }

  /** 接收最終選擇的資料
   * @param timeItem 被選擇的那筆資料
   */
  onTimeSelect(timeItem: TimeItem) {
    // demo 測試使用
    console.log(timeItem);
  }
}
