/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { DetailData, TimeRecord } from 'time-selector/src/lib/timerecord';
import '@his-base/array-extention';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'his-timeline',
  standalone: true,
  imports: [CommonModule,PanelMenuModule,TimelineModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit{
  @Input() diseaseRecord!: TimeRecord[];

  yearsMenu !: MenuItem[];
  changeTypeRecord: object[]=[];
  timelineRecord !:object[];
  previousSelect!: DetailData;
  inTimeline!: boolean;
  clicked:boolean = false;

  constructor(private formBuilder: FormBuilder,private el: ElementRef) {}

  ngOnInit(): void {
    const sortTimes = this.sortTimeRecord(this.diseaseRecord);
    const groupTimes = this.groupbyTimeRecord(sortTimes);
    const getYearMonths = this.getYearMonth(groupTimes);
    this.yearsMenu = getYearMonths;
  }

  sortTimeRecord(records:TimeRecord[]){
    return records.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
  groupbyTimeRecord(records:TimeRecord[]){
    console.log(records.groupBy(x=>[x.date.getFullYear()]));
    return records.groupBy(x=>[x.date.getFullYear()]);
  }
  getYearMonth(records: Record<string | number | symbol, TimeRecord[]>){
    let timeMenuItem:MenuItem[]=[];
    Object.entries(records).forEach(([key, value]) => {
      const yearMonthKey = JSON.parse(key);
      const monthGroup = value.groupBy(x=>x.date.getMonth());
      let tmpMonth:object[]=[];

      Object.entries(monthGroup).forEach(([key, value]) => {
        const MonthKey = JSON.parse(key);
        const tmp = {label:(MonthKey+1).toString().padStart(2, "0"),command:()=>this.changeDataInTimeline(value[0].date,value[0].title,value[0].subtitle)};
        tmpMonth = [...tmpMonth,tmp];

      });
      timeMenuItem = timeMenuItem.concat({label:yearMonthKey,items:tmpMonth});
    });
    return timeMenuItem;
  }
  changeDataInTimeline(nowTime:Date,nowTitle:string,nowSubtitle:string){
    this.changeTypeRecord =[];
    this.diseaseRecord.forEach((a)=>{
    const monthDay = (a.date.getMonth()+1).toString().padStart(2, "0")+'-'+a.date.getDate();
    const monthDayTime = (a.date.getMonth()+1).toString().padStart(2, "0")+'-'+a.date.getDate()+' '+a.date.getHours()+':'+a.date.getMinutes()+' '+ a.title;
    const nowRecord = {time:monthDay,title:a.title,subtitle:a.subtitle,detail:monthDayTime,color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"};
    this.changeTypeRecord = [...this.changeTypeRecord,nowRecord];
    });
    this.timelineRecord = this.changeTypeRecord;

    const selectedIndex = this.diseaseRecord.findIndex(x=>x.date === nowTime);
    const recordLength = this.diseaseRecord.length;
    this.scrollToTarget(selectedIndex,recordLength);
  }
  onGetSelect(selectedTime:DetailData){
    if (this.previousSelect){
      this.previousSelect.color='#3C6353';
      this.previousSelect.class="eachconnent";
    }
    selectedTime.color = "#C77516";
    selectedTime.class = "eachconnent-select";
    this.previousSelect = selectedTime;
  }

  scrollToTarget(height:number,total:number) {
    /**為了等時間軸生成用promise，等到好後可捲動畫面，沒有的話按第一次不會捲動 */
    return new Promise(() => {
      setTimeout(() => {
        const scrollBody = document.getElementById('scrollTable');
        const timeline = document.getElementById('timeline');
        if (timeline){
          const percent = height / total;
          console.log(timeline.scrollTop);
          const target = (percent)*(timeline.offsetHeight)-10;
          scrollBody?.scrollTo(0,target);
        }
      }, 5);
    });
  }

  onClickActive(){
    // const yearPanel = document.getElementById('yearsPanel');
    // yearPanel.active()
    console.log('----');
    const x = '2021'
    const searchLabel = '[aria-label="'+x+'"]'
    const yearsPanel = document.querySelector(searchLabel);
    console.log(yearsPanel);
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    if(yearsPanel){
      yearsPanel.dispatchEvent(clickEvent);
    }
  }
  onCheckMouseIn(){
    this.inTimeline = true;
  }
  onCheckMouseOut(){
    this.inTimeline = false;
  }

  @HostListener('scroll', ['$event']) onElementScroll($event: any) {
    // console.log($event.offsetTop); //有監聽到事件
    const modal= this.el.nativeElement.querySelector('#scrollTable');
    console.log(modal.scrollTop);

    const x = '1997'
    const searchLabel = '[aria-label="'+x+'"]'
    const yearsPanel = document.querySelector(searchLabel);
    console.log(yearsPanel);
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    if(yearsPanel){
      const ariaExpanded = yearsPanel.getAttribute('aria-expanded');
      const isSelected = ariaExpanded === "true";
      if(!isSelected && this.inTimeline){
        yearsPanel.dispatchEvent(clickEvent);
      }
    }

  }

   reverseBoolean(value: boolean) {
    console.log('in function value :' , value);
    return !value;
  }
}
