import { ElementRef, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DetailData, TimeRecord } from 'time-selector/src/lib/timerecord';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  diseaseRecord!: TimeRecord[];

  #changeTypeRecord!: object[];
  #previousSelect!: DetailData;

  #cssClass!: object;
  #selectCss!: object;

  setInitRecord(diseaseRecord: TimeRecord[]){
    this.diseaseRecord = diseaseRecord;
    this.#cssClass = {dotColor: "#3C6353", dotStyle: "dot-style", connectStyle: "eachconnent", time: "button-time", titile: "fontsize", subtitle: "fontsize-caption"};
    this.#selectCss = {dotColor: "#C77516", dotStyle:"dot-style", connectStyle:"eachconnent-select", time: "button-time-selected", titile: "fontsize-selected", subtitle:"fontsize-caption-selected"};
  }

  sortTimeRecord(records: TimeRecord[]){
    return records.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  groupbyTimeRecord(records: TimeRecord[]){
    return records.groupBy(x=>[x.date.getFullYear()]);
  }

  getYearMonth(records: Record<string | number | symbol, TimeRecord[]>){
    let timeMenuItem: MenuItem[] = [];
    Object.entries(records).forEach(([key, value]) => {
      const yearMonthKey = JSON.parse(key);
      const monthGroup = value.groupBy(x => x.date.getMonth());
      let tmpMonth: object[] = [];

      Object.entries(monthGroup).forEach(([key, value]) => {
        const MonthKey = JSON.parse(key);
        const tmp = {label: (MonthKey+1).toString().padStart(2, "0"), command: () => this.scrollToTarget(value[0].date)};
        tmpMonth = [...tmpMonth, tmp];
      });
      timeMenuItem = timeMenuItem.concat({label: yearMonthKey, items: tmpMonth});
    });
    return timeMenuItem;
  }

  scrollToTarget(nowTime: Date) {
    const selectedIndex = this.diseaseRecord.findIndex(x=>x.date === nowTime);
    const recordLength = this.diseaseRecord.length;
    const scrollBody = document.getElementById('scrollTable');
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    const percent = selectedIndex / recordLength;
    const target = (percent) * (timeline.offsetHeight) -10;
    scrollBody?.scrollTo(0, target);
  }

  changeDataInTimeline(){
    this.#changeTypeRecord = [];
    this.diseaseRecord.forEach((a) => {
      const monthDay = a.date.formatString('MM-DD');
      const nowRecord = {time: monthDay, title: a.title, subtitle: a.subtitle, class: this.#cssClass, id: a.id};
      this.#changeTypeRecord = [...this.#changeTypeRecord, nowRecord];
    });
    return this.#changeTypeRecord;
  }

  onSelectTime(selectedTime: DetailData){
    if (this.#previousSelect){
      this.#previousSelect.class = this.#cssClass;
    }
    selectedTime.class = this.#selectCss;
    this.#previousSelect = selectedTime;

    return this.diseaseRecord.find(x => x.id === selectedTime.id);
  }

  onElementScroll(el: ElementRef<any>, inTimeline: boolean){
    const scrollTable = el.nativeElement.querySelector('#scrollTable');
    const timeline = document.getElementById('timeline');
    if(!timeline) return;

    //找到目前的高度比例，以及找出對應的目標在哪一年,前往目標。
    const percent = ((scrollTable.scrollTop)/timeline.offsetHeight);
    const searchLabel = this.findTargetYears(percent);
    this.openTimeMenu(searchLabel, inTimeline);
  }
  findTargetYears(percent: number){
    //依比例去找出目標在哪一年
    const targetIndex = Math.floor(percent*this.diseaseRecord.length);
    const years = this.diseaseRecord[targetIndex+1].date.getFullYear();
    //找到對應的menu選單label
    const searchLabel = '[aria-label="'+years+'"]'
    return searchLabel;
  }
  openTimeMenu(searchLabel: string ,inTimeline: boolean){
    const yearsPanel = document.querySelector(searchLabel);
    if(!yearsPanel) return;

    //確認選單是否有打開
    const ariaExpanded = yearsPanel.getAttribute('aria-expanded');
    const expandedState = ariaExpanded === "true";
    if(expandedState || !inTimeline) return;

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    yearsPanel.dispatchEvent(clickEvent);
  }
}
