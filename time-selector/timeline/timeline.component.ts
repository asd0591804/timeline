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
    this.yearsMenu = this.getYearMonth(groupTimes);

  }

  sortTimeRecord(records:TimeRecord[]){
    return records.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
  groupbyTimeRecord(records:TimeRecord[]){
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
        const tmp = {label:(MonthKey+1).toString().padStart(2, "0"),command:()=>this.changeDataInTimeline(value[0].date)};
        tmpMonth = [...tmpMonth,tmp];
      });
      timeMenuItem = timeMenuItem.concat({label:yearMonthKey,items:tmpMonth});
    });
    return timeMenuItem;
  }
  changeDataInTimeline(nowTime:Date){
    this.changeTypeRecord =[];
    this.diseaseRecord.forEach((a)=>{
      const monthDay = (a.date.getMonth()+1).toString().padStart(2, "0")+'-'+a.date.getDate();
      const monthDayTime = (a.date.getMonth()+1).toString().padStart(2, "0")+'-'+a.date.getDate()+' '+a.date.getHours()+':'+a.date.getMinutes()+' '+ a.title;
      const nowRecord = {time:monthDay,title:a.title,subtitle:a.subtitle,detail:monthDayTime,color: '#3C6353',style:"border: 0px solid #3C6353;border-radius: 50%;width: 1rem;height: 1rem;"};
      this.changeTypeRecord = [...this.changeTypeRecord,nowRecord];
    });
    this.timelineRecord = this.changeTypeRecord;

    this.scrollToTarget(nowTime);
  }
  onSelectTime(selectedTime:DetailData){
    if (this.previousSelect){
      this.previousSelect.color='#3C6353';
      this.previousSelect.class="eachconnent";
    }
    selectedTime.color = "#C77516";
    selectedTime.class = "eachconnent-select";
    this.previousSelect = selectedTime;
  }

  scrollToTarget(nowTime:Date) {
    /**為了等時間軸生成用promise，等到好後可捲動畫面，沒有的話按第一次不會捲動 */
    return new Promise(() => {
      setTimeout(() => {
        const selectedIndex = this.diseaseRecord.findIndex(x=>x.date === nowTime);
        const recordLength = this.diseaseRecord.length;
        const scrollBody = document.getElementById('scrollTable');
        const timeline = document.getElementById('timeline');
        if (timeline){
          const percent = selectedIndex / recordLength;
          const target = (percent)*(timeline.offsetHeight)-10;
          scrollBody?.scrollTo(0,target);
        }
      }, 5);
    });
  }

  /**測試按鈕用的function 可刪 */
  onClickActive(){
    const x = '2021'
    const searchLabel = '[aria-label="'+x+'"]'
    const yearsPanel = document.querySelector(searchLabel);
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

  @HostListener('scroll', ['$event']) onElementScroll() {
    //監聽到捲軸滾動事件
    const modal= this.el.nativeElement.querySelector('#scrollTable');
    const timeline = document.getElementById('timeline');
    if(timeline){
      //找到目前的高度比例
      const percent = ((modal.scrollTop)/timeline.offsetHeight);
      //找出對應的目標在哪一年
      const searchLabel = this.findTargetYears(percent);
      this.openTimeMenu(searchLabel);
    }
  }

  findTargetYears(percent:number){
     //依比例去找出目標在哪一年
     const targetIndex = Math.floor(percent*this.diseaseRecord.length);
     const years = this.diseaseRecord[targetIndex+1].date.getFullYear();
     //找到對應的menu選單label
     const searchLabel = '[aria-label="'+years+'"]'
     return searchLabel;
  }
  openTimeMenu(searchLabel:string){
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const yearsPanel = document.querySelector(searchLabel);
    //如果選單存在在執行
    if(yearsPanel){
      //確認選單是否有打開
      const ariaExpanded = yearsPanel.getAttribute('aria-expanded');
      const expandedState = ariaExpanded === "true";
      //如果不是打開狀態，以及確認了滑鼠在timeline之中(代表使用者在捲動)，再點開，
      if(!expandedState && this.inTimeline){
        yearsPanel.dispatchEvent(clickEvent);
      }
    }
  }
}
