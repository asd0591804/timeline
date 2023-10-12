import { TimeContent, TimeRecord } from 'timeline/src/lib/timeline.interface';
import { Injectable } from '@angular/core';
import '@his-base/data-extension';

@Injectable({
  providedIn: 'root'
})
export class TimeContentService {

  /** 初始化資料，更新後取新的值 */
  getTimeContents(records: TimeRecord[]) {
    if (!records) return [];

    return records.map(x => {
      const time = x.date.formatString('MM-DD HH:mm ');
      return {...x, recordId: x.id, time};
    })
  }

  /** 找出目標的原始資料送出 */
  getSelectedRecord(records: TimeRecord[], timeContent: TimeContent) {
    return records.find(x => x.id === timeContent.recordId)
  }
}
