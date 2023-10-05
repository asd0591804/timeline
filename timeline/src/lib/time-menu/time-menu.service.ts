import { ElementRef, Injectable } from '@angular/core';
import { TimelineSubject, TimeRecord } from 'timeline/src/lib/timeline.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeMenuService {
  #previousSelect!: TimelineSubject;

  /** 排序資料
   * @param records
   * @returns
   */
  sortTimeRecord(records: TimeRecord[]) {
    return records.sort((x, y) => x.date.getTime() - y.date.getTime());
  }

  /** 將資料分組
   * @param records
   * @returns
   */
  groupbyTimeRecord(records: TimeRecord[]) {
    return records.groupBy(x => [x.date.getFullYear()]);
  }

  /** 取得左側年月列表可讀取 menuitem
   * @param records
   * @returns
   */
  getMenu(value: TimeRecord[], records: Record<string | number | symbol, TimeRecord[]>) {
    return Object.entries(records).map(([x, y]) => {
      const yearMonthKey = JSON.parse(x);
      const monthGroup = y.groupBy(z => z.date.getMonth());
      const months: object[] = this.#getMenuItems(value, monthGroup);
      return { label: yearMonthKey, items: months };
    })
  }

  /** 將資料轉成 時間軸讀取的格式
   * @returns
   */
  getTimelineRecord(record: TimeRecord[]) {
    return record.map(x => {
      const monthDay = x.date.formatString('MM-DD');
      const nowRecord = {time: monthDay, title: x.title, subtitle: x.subtitle, selected: false, id: x.id};
      return nowRecord;
    })
  }

  /** 切換點選的CSS
   * @param selectedTime
   */
  changeCss(selectedTime: TimelineSubject) {
    if (this.#previousSelect) {
      this.#previousSelect.isSelected = false;
    }
    selectedTime.isSelected = true;
    this.#previousSelect = selectedTime;
  }

  /** 找到點選的目標所指向的原始資料
   * @param selectedTime
   * @returns
   */
  findRecord(record: TimeRecord[], selectedTime: TimelineSubject) {
    return record.find(x => x.id === selectedTime.id)
  }

  /** 監聽畫面的滾動，使年份與時間軸達成一致
   * @param el
   * @param isInTimeline
   * @returns
   */
  onElementScroll(el: ElementRef<any>, record: TimeRecord[], isInTimeline: boolean) {
    const scrollTable = el.nativeElement.querySelector('#scrollTable');
    const timeline = document.getElementById('timeline');
    if(!timeline || !scrollTable) return;

    const percent = (scrollTable.scrollTop / timeline.offsetHeight);
    const searchLabel = this.#getYears(record, percent);
    this.#openTimeMenu(searchLabel, isInTimeline);
  }

  /** 點選時間後，跳到對應的時間軸
   * @param nowTime
   * @returns
   */
  #scrollToTarget(record: TimeRecord[], nowTime: Date) {
    const scrollBody = document.getElementById('scrollTable');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollBody) return;

    const selectedIndex = record.findIndex(x => x.date === nowTime);
    const recordLength = record.length;
    const percent = selectedIndex / recordLength;
    const target = percent * timeline.offsetHeight - 10;
    scrollBody.scrollTo(0, target);
  }

  /** 依滾輪取得的目前高度去尋找對應的年份
   * @param percent
   * @returns
   */
  #getYears(record: TimeRecord[], percent: number) {
    const targetIndex = Math.floor(percent * record.length);
    const years = record[targetIndex + 1].date.getFullYear();
    const searchLabel = `[aria-label="${ years }"]`;
    return searchLabel;
  }

  /** 打開對應的列表
   * @param searchLabel
   * @param isInTimeline
   * @returns
   */
  #openTimeMenu(searchLabel: string ,isInTimeline: boolean) {
    const yearsPanel = document.querySelector(searchLabel);
    if(!yearsPanel) return;

    const ariaExpanded = yearsPanel.getAttribute('aria-expanded');
    const expandedState = ariaExpanded === "true";
    if(expandedState || !isInTimeline) return;

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    yearsPanel.dispatchEvent(clickEvent);
  }

  /** 獲得月份轉換成menuitem的形式
   * @param monthGroup
   * @returns
   */
  #getMenuItems(record: TimeRecord[], monthGroup: Record<string | number | symbol, TimeRecord[]>) {
    return Object.entries(monthGroup).map(([x, y]) => {
      const MonthKey = JSON.parse(x);
      return {
        label: (MonthKey + 1).toString().padStart(2, "0"),
        command: () => this.#scrollToTarget(record, y[0].date)
      };
    });
  }
}
