import { Injectable } from '@angular/core';
import { TimeRecord } from 'time-selector/src/lib/timerecord';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  timeRecord!: TimeRecord[];

  setInitial(){
    this.timeRecord = [
      {date: new Date(1995, 1, 17, 3, 24, 0), title: '醫師1', subtitle: '急診', id: '1', subrecord: [{date: new Date(1995, 1, 17, 3, 24, 0), title: '醫師1', subtitle: '急診', id: '1'}]},
      {date: new Date(1997, 11, 17, 3, 24, 0), title: '醫師2', subtitle: '門診', id: '2', subrecord: [{date: new Date(1997, 11, 17, 3, 24, 0), title: '醫師2', subtitle: '門診', id: '2'}]},
      {date: new Date(1999, 3, 17, 3, 24, 0), title: '醫師3', subtitle: '門診', id: '3', subrecord: [{date: new Date(1999, 3, 17, 3, 24, 0), title: '醫師3', subtitle: '門診', id: '3'}]},
      {date: new Date(1999, 11, 17, 3, 24, 0), title: '醫師4', subtitle: '住院', id: '4', subrecord: [
        {date: new Date(1999, 11, 17, 3, 24, 0), title: '醫師4', subtitle: '住院', id: '4-0'},
        {date: new Date(1999, 11, 18, 3, 24, 0), title: '醫師4', subtitle: '住院', id: '4-1'},
        {date: new Date(1999, 11, 19, 3, 24, 0), title: '醫師4', subtitle: '住院', id: '4-2'},
        {date: new Date(1999, 11, 20, 3, 24, 0), title: '醫師4', subtitle: '住院', id: '4-3'},
        {date: new Date(1999, 11, 21, 3, 24, 0), title: '醫師4', subtitle: '住院', id: '4-4'},
        {date: new Date(1999, 11, 22, 3, 24, 0), title: '醫師4', subtitle: '住院', id: '4-5'}
      ]},
      {date: new Date(2020, 5, 17, 3, 24, 0), title: '醫師5', subtitle: '急診', id: '5', subrecord: [{date: new Date(2020, 5, 17, 3, 24, 0), title: '醫師5', subtitle: '急診', id: '5'}]},
      {date: new Date(2020, 11, 17, 3, 24, 0), title: '醫師6', subtitle: '住院', id: '6', subrecord: [{date: new Date(2020, 11, 17, 3, 24, 0), title: '醫師6', subtitle: '住院', id: '6'}]},
      {date: new Date(2021, 0, 16, 3, 24, 0), title: '醫師7', subtitle: '門診', id: '7', subrecord: [{date: new Date(2021, 0, 16, 3, 24, 0), title: '醫師7', subtitle: '門診', id: '7'}]},
      {date: new Date(2021, 2, 17, 3, 25, 0), title: '醫師8', subtitle: '急診', id: '8', subrecord: [{date: new Date(2021, 2, 17, 3, 25, 0), title: '醫師8', subtitle: '急診', id: '8'}]},
      {date: new Date(2021, 3, 18, 3, 26, 0), title: '醫師9', subtitle: '門診', id: '9', subrecord: [{date: new Date(2021, 3, 18, 3, 26, 0), title: '醫師9', subtitle: '門診', id: '9'}]},
      {date: new Date(2021, 5, 19, 3, 27, 0), title: '醫師10' ,subtitle :'急診' ,id :'10', subrecord: [{date: new Date(2021, 5, 19, 3, 27, 0), title: '醫師10' ,subtitle :'急診' ,id :'10'}]},
      {date: new Date(2021, 7, 20, 3, 28, 0), title: '醫師11' ,subtitle :'門診' ,id :'11', subrecord: [{date: new Date(2021, 7, 20, 3, 28, 0), title: '醫師11' ,subtitle :'門診' ,id :'11'}]},
      {date: new Date(2021, 7, 21, 3, 28, 0), title: '醫師12' ,subtitle :'住院' ,id :'12', subrecord: [{date: new Date(2021, 7, 21, 3, 28, 0), title: '醫師12' ,subtitle :'住院' ,id :'12'}]},
      {date: new Date(2021, 9, 22, 3, 29, 0), title: '醫師13' ,subtitle :'急診' ,id :'13', subrecord: [{date: new Date(2021, 9, 22, 3, 29, 0), title: '醫師13' ,subtitle :'急診' ,id :'13'}]},
      {date: new Date(1995, 1, 17, 3, 24, 0), title: '醫師14' ,subtitle :'住院' ,id :'14', subrecord: [{date: new Date(1995, 1, 17, 3, 24, 0), title: '醫師14' ,subtitle :'住院' ,id :'14'}]},
      {date: new Date(1997, 11, 17, 3, 24, 0), title: '醫師15' ,subtitle :'住院' ,id :'15', subrecord: [{date: new Date(1997, 11, 17, 3, 24, 0), title: '醫師15' ,subtitle :'住院' ,id :'15'}]},
      {date: new Date(1999, 3, 17, 3, 24, 0), title: '醫師16' ,subtitle :'門診' ,id :'16', subrecord: [{date: new Date(1999, 3, 17, 3, 24, 0), title: '醫師16' ,subtitle :'門診' ,id :'16'}]},
      {date: new Date(1999, 11, 17, 3, 24, 0), title: '醫師17' ,subtitle :'門診' ,id :'17', subrecord: [{date: new Date(1999, 11, 17, 3, 24, 0), title: '醫師17' ,subtitle :'門診' ,id :'17'}]},
      {date: new Date(2020, 5, 17, 3, 24, 0), title: '醫師18' ,subtitle :'住院' ,id :'18', subrecord: [{date: new Date(2020, 5, 17, 3, 24, 0), title: '醫師18' ,subtitle :'住院' ,id :'18'}]},
      {date: new Date(2020, 11, 17, 3, 24, 0), title: '醫師19' ,subtitle :'門診' ,id :'19', subrecord: [{date: new Date(2020, 11, 17, 3, 24, 0), title: '醫師19' ,subtitle :'門診' ,id :'19'}]},
      {date: new Date(2021, 2, 19, 3, 27, 0), title: '醫師20' ,subtitle :'住院' ,id :'20', subrecord: [{date: new Date(2021, 2, 19, 3, 27, 0), title: '醫師20' ,subtitle :'住院' ,id :'20'}]},
      {date: new Date(2021, 3, 20, 3, 28, 0), title: '醫師21' ,subtitle :'門診' ,id :'id', subrecord: [{date: new Date(2021, 3, 20, 3, 28, 0), title: '醫師21' ,subtitle :'門診' ,id :'id'}]},
      {date: new Date(2021, 4, 21, 3, 28, 0), title: '醫師22' ,subtitle :'住院' ,id :'id', subrecord: [{date: new Date(2021, 4, 21, 3, 28, 0), title: '醫師22' ,subtitle :'住院' ,id :'id'}]},
      {date: new Date(2021, 5, 22, 3, 29, 0), title: '醫師23' ,subtitle :'門診' ,id :'id', subrecord: [{date:new Date(2021, 5, 22, 3, 29, 0), title: '醫師23' ,subtitle :'門診' ,id :'id'}]},
    ];

    return this.timeRecord
  }
}
