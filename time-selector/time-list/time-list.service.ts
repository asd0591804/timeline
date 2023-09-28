import { TimeRecord } from 'time-selector/src/lib/timerecord';
import { Injectable } from '@angular/core';
import '@his-base/data-extension';

@Injectable({
  providedIn: 'root'
})
export class TimeListService {

  /** 初始化資料，更新後取新的值
   * @param list
   * @param listDetail
   * @returns
   */
  setInitial(list: TimeRecord[], listDetail: object){
    let defaultIcon = 'summarize';
    if(!listDetail) return [{title: "請點選資料", icon: defaultIcon, hide: true}];

    return list.map((x) => {
      const time = x.date.formatString(`MM-DD HH:mm `);
      if(x.icon){
        defaultIcon = x.icon;
        return {time: time, title: x.title, id: x.id, icon: defaultIcon, hide: false};
      }
      return {time: time, title: x.title, id: x.id, icon: defaultIcon, hide: true};
    })
  }

  /** 找出目標的原始資料送出
   * @param event
   * @param list
   * @returns
   */
  getRecord(event: TimeRecord, list: TimeRecord[]){
    return list.find(x => x.id === event.id)
  }
}
