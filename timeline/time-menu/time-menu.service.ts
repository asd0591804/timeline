import { ElementRef, Injectable } from '@angular/core';
import { DetailData, TimeRecord } from 'timeline/src/lib/timerecord';

@Injectable({
  providedIn: 'root'
})
export class TimeMenuService {
  #record!: TimeRecord[];
  #previousSelect!: DetailData;

  /** 初始化所需資料
   * @param value
   */
  setInitRecord(value: TimeRecord[]){
    this.#record = value;
  }

  /** 排序資料
   * @param records
   * @returns
   */
  sortTimeRecord(records: TimeRecord[]){
    return records.sort((x, y) => x.date.getTime() - y.date.getTime());
  }

  /** 將資料分組
   * @param records
   * @returns
   */
  groupbyTimeRecord(records: TimeRecord[]){
    return records.groupBy(x => [x.date.getFullYear()]);
  }

  /** 取得左側年月列表可讀取 menuitem
   * @param records
   * @returns
   */
  getYearMonth(records: Record<string | number | symbol, TimeRecord[]>){
    return Object.entries(records).map(([x, y]) => {
      const yearMonthKey = JSON.parse(x);
      const monthGroup = y.groupBy(z => z.date.getMonth());
      const months: object[] = this.#getMenuItems(monthGroup);
      return { label: yearMonthKey, items: months };
    })
  }

  /** 將資料轉成 時間軸讀取的格式
   * @returns
   */
  changeDataInTimeline(){
    return this.#record.map(x => {
      const monthDay = x.date.formatString('MM-DD');
      const nowRecord = {time: monthDay, title: x.title, subtitle: x.subtitle, selected: false, id: x.id};
      return nowRecord;
    })
  }

  /** 切換點選的CSS
   * @param selectedTime
   */
  changeCss(selectedTime: DetailData){
    if (this.#previousSelect){
      this.#previousSelect.selected = false;
    }
    selectedTime.selected = true;
    this.#previousSelect = selectedTime;
  }

  /** 找到點選的目標所指向的原始資料
   * @param selectedTime
   * @returns
   */
  findTarget(selectedTime: DetailData){
    return this.#record.find(x => x.id === selectedTime.id)
  }

  /** 監聽畫面的滾動，使年份與時間軸達成一致
   * @param el
   * @param inTimeline
   * @returns
   */
  onElementScroll(el: ElementRef<any>, inTimeline: boolean){
    const scrollTable = el.nativeElement.querySelector('#scrollTable');
    const timeline = document.getElementById('timeline');
    if(!timeline || !scrollTable) return;

    const percent = ((scrollTable.scrollTop)/timeline.offsetHeight);
    const searchLabel = this.#findTargetYears(percent);
    this.#openTimeMenu(searchLabel, inTimeline);
  }

  /** 點選時間後，跳到對應的時間軸
   * @param nowTime
   * @returns
   */
  #scrollToTarget(nowTime: Date) {
    const selectedIndex = this.#record.findIndex(x => x.date === nowTime);
    const recordLength = this.#record.length;
    const scrollBody = document.getElementById('scrollTable');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollBody) return;

    const percent = selectedIndex / recordLength;
    const target = percent * timeline.offsetHeight - 10;
    scrollBody.scrollTo(0, target);
  }

  /** 依滾輪取得的目前高度去尋找對應的年份
   * @param percent
   * @returns
   */
  #findTargetYears(percent: number){
    const targetIndex = Math.floor(percent * this.#record.length);
    const years = this.#record[targetIndex + 1].date.getFullYear();
    const searchLabel = `[aria-label="${years}"]`;
    return searchLabel;
  }

  /** 打開對應的列表
   * @param searchLabel
   * @param inTimeline
   * @returns
   */
  #openTimeMenu(searchLabel: string ,inTimeline: boolean){
    const yearsPanel = document.querySelector(searchLabel);
    if(!yearsPanel) return;

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

  /** 獲得月份轉換成menuitem的形式
   * @param monthGroup
   * @returns
   */
  #getMenuItems(monthGroup: Record<string | number | symbol, TimeRecord[]>){
    return Object.entries(monthGroup).map(([x, y]) => {
      const MonthKey = JSON.parse(x);
      return {
        label: (MonthKey + 1).toString().padStart(2, "0"),
        command: () => this.#scrollToTarget(y[0].date)
      };
    });
  }
}
