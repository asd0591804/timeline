import { TimeRecord } from 'time-selector/src/lib/timerecord';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeListService {

  setInitial(list: TimeRecord[], listDetail: object){
    if(!listDetail) return [{title: "請點選資料"}];

    return list.map((a) => {
      return {title: (a.date.getMonth()+1).toString().padStart(2, "0")+'-'+a.date.getDate()+' '+a.date.getHours()+':'+a.date.getMinutes()+' '+ a.title,id:a.id};
    })
  }

  dataTransform(event: TimeRecord, list: TimeRecord[]){
    return list.find(x => x.id === event.id)
  }
}
