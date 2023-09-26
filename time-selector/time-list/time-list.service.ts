import { TimeRecord } from 'time-selector/src/lib/timerecord';
import { Injectable } from '@angular/core';
import '@his-base/data-extension';

@Injectable({
  providedIn: 'root'
})
export class TimeListService {

  setInitial(list: TimeRecord[], listDetail: object){
    if(!listDetail) return [{title: "請點選資料"}];

    return list.map((a) => {
      const newTitle = a.date.formatString('MM-DD HH:mm '+a.title)
      return {title: newTitle, id: a.id};
    })
  }

  dataTransform(event: TimeRecord, list: TimeRecord[]){
    return list.find(x => x.id === event.id)
  }
}
