import { TimeContent, TimeRecord } from 'timeline/src/lib/timeline.interface';
import { Injectable } from '@angular/core';
import '@his-base/data-extension';

@Injectable({
  providedIn: 'root'
})
export class TimeContentService {

  /** 初始化資料，更新後取新的值
   * @param records
   * @param timeContents
   * @returns
   */
  getTimeContent(records: TimeRecord[], timeContents: TimeContent[]) {
    if (!timeContents) {
      return [{recordId: '', time: '', title: '請點選資料', icon: 'summarize', hide: true}];
    }

    return records.map(x => {
      const time = x.date.formatString('MM-DD HH:mm ');
      if (x.icon) {
        return {recordId: x.id, time: time, title: x.title, icon: x.icon, hide: false};
      }
      return {recordId: x.id, time: time, title: x.title, icon: 'summarize', hide: true};
    })
  }

  /** 找出目標的原始資料送出
   * @param records
   * @param timeContent
   * @returns
   */
  getSelectedRecord(records: TimeRecord[], timeContent: TimeContent) {
    return records.find(x => x.id === timeContent.recordId)
  }
}
