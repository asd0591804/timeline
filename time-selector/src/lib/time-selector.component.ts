import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from "../../timeline/timeline.component";
import { TimeListComponent } from "../../time-list/time-list.component";
import { TimeRecord } from './timerecord';

@Component({
    selector: 'his-time-selector',
    standalone: true,
    template: `
    <div class="outside">
      <div class="forFlex">
        <his-timeline [diseaseRecord]="diseaseRecord"></his-timeline>
        <his-time-list></his-time-list>
      </div>
    </div>
  `,
    styles: [],
    imports: [CommonModule, TimelineComponent, TimeListComponent]
})
export class TimeSelectorComponent implements OnInit {
  diseaseRecord!: TimeRecord[];
  ngOnInit(){
    this.diseaseRecord = [
      {date:new Date(1995, 1, 17, 3, 24, 0),title:'醫師1',subtitle:'就診類別',id:'id'},
      {date:new Date(1997, 11, 17, 3, 24, 0),title:'醫師2',subtitle:'就診類別',id:'id'},
      {date:new Date(1999, 3, 17, 3, 24, 0),title:'醫師4',subtitle:'就診類別',id:'id'},
      {date:new Date(1999, 11, 17, 3, 24, 0),title:'醫師5',subtitle:'就診類別',id:'id'},
      {date:new Date(2020, 5, 17, 3, 24, 0),title:'醫師6',subtitle:'就診類別',id:'id'},
      {date:new Date(2020, 11, 17, 3, 24, 0),title:'醫師7',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 0, 16, 3, 24, 0),title:'醫師8',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 2, 17, 3, 25, 0),title:'醫師9',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 3, 18, 3, 26, 0),title:'醫師9',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 5, 19, 3, 27, 0),title:'醫師10',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 7, 20, 3, 28, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 7, 21, 3, 28, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 9, 22, 3, 29, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(1995, 1, 17, 3, 24, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(1997, 11, 17, 3, 24, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(1999, 3, 17, 3, 24, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(1999, 11, 17, 3, 24, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(2020, 5, 17, 3, 24, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(2020, 11, 17, 3, 24, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 2, 19, 3, 27, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 3, 20, 3, 28, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 4, 21, 3, 28, 0),title:'醫師',subtitle:'就診類別',id:'id'},
      {date:new Date(2021, 5, 22, 3, 29, 0),title:'醫師23',subtitle:'就診類別',id:'id'},];
  }

}
