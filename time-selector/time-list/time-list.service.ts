import { TimeRecord } from 'time-selector/src/lib/timerecord';
import { Injectable } from '@angular/core';
import '@his-base/data-extension';

@Injectable({
  providedIn: 'root'
})
export class TimeListService {

  /**
   * 初始化資料，更新後取新的值
   * @param list
   * @param listDetail
   * @returns
   */
  setInitial(list: TimeRecord[], listDetail: object){
    if(!listDetail) return [{title: "請點選資料"}];

    return list.map((x) => {
      const newTitle = x.date.formatString(`MM-DD HH:mm ${x.title}`)
      return {title: newTitle, id: x.id};
    })
  }

  /**
   * 找出目標的原始資料送出
   * @param event
   * @param list
   * @returns
   */
  getRecord(event: TimeRecord, list: TimeRecord[]){
    return list.find(x => x.id === event.id)
  }
}
