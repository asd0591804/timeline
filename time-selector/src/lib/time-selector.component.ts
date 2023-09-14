import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from "../../timeline/timeline.component";
import { TimeListComponent } from "../../time-list/time-list.component";

@Component({
    selector: 'his-time-selector',
    standalone: true,
    template: `
    <div class="outside">
      <div class="forFlex">
        <his-timeline [events]="events"></his-timeline>
        <his-time-list></his-time-list>
      </div>
    </div>
  `,
    styles: [],
    imports: [CommonModule, TimelineComponent, TimeListComponent]
})
export class TimeSelectorComponent implements OnInit {
  events!: object[];
  ngOnInit(){
    this.events = [
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
      { title: '醫師', time: '日期', subtitle: '類別',color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"},
  ];
  }

}
