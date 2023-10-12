import { ElementRef, Injectable } from '@angular/core';
import { TimelineSubject, TimeRecord } from 'timeline/src/lib/timeline.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeMenuService {
  #previousSelect!: TimelineSubject;

  /** 取得左側年月列表可讀取 menuitem
   * @param value
   * @param records
   * @returns
   */
  getTimeMenu(value: TimeRecord[]) {
    const sortedValue = this.#sortTimeRecord(value);
    const groupedValue = this.#groupbyTimeRecord(sortedValue);

    return Object.entries(groupedValue).map(([x, y]) => {
      const label = JSON.parse(x);

      const monthGroup = y.groupBy(z => z.date.getMonth());
      const items: object[] = this.#getMenuItems(value, monthGroup);
      return { label, items };
    })
  }

  /** 將資料轉成 時間軸讀取的格式
   * @param record
   * @returns
   */
  getTimelineRecord(record: TimeRecord[]) {
    return record.map(x => {
      const time = x.date.formatString('MM-DD');
      return {...x, time, isSelected:false};
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
   * @param records
   * @param selectedTime
   * @returns
   */
  getSelectedRecord(records: TimeRecord[], selectedTime: TimelineSubject) {
    return records.find(x => x.id === selectedTime.id);
  }

  /** 監聽畫面的滾動，使年份與時間軸達成一致
   * @param el
   * @param records
   * @param isInTimeline
   * @returns
   */
  scrollTimeline(el: ElementRef<any>, records: TimeRecord[], isInTimeline: boolean) {
    const scrollTable = el.nativeElement.querySelector('#scrollTable');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollTable || timeline.offsetHeight === 0) return;

    const percent = (scrollTable.scrollTop / timeline.offsetHeight);
    const searchLabel = this.#getYearsLabel(records, percent);
    this.#openTimeMenu(searchLabel, isInTimeline);
  }

  /** 排序資料
   * @param records
   * @returns
   */
  #sortTimeRecord(records: TimeRecord[]) {
    return records.sort((x, y) => x.date.getTime() - y.date.getTime());
  }

  /** 將資料分組
   * @param records
   * @returns
   */
  #groupbyTimeRecord(records: TimeRecord[]) {
    return records.groupBy(x => [x.date.getFullYear()]);
  }

  /** 點選時間後，跳到對應的時間軸
   * @param records
   * @param target
   * @returns
   */
  #scrollToTarget(records: TimeRecord[], target: Date) {
    if (!records) return;

    const scrollBody = document.getElementById('scrollTable');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollBody) return;

    const selectedIndex = records.findIndex(x => x.date === target);
    const recordLength = records.length;
    const percent = selectedIndex / recordLength;
    const targetHeight = percent * timeline.offsetHeight - 10;
    scrollBody.scrollTo(0, targetHeight);
  }

  /** 依滾輪取得的目前高度去尋找對應的年份
   * @param records
   * @param percent
   * @returns
   */
  #getYearsLabel(records: TimeRecord[], percent: number) {
    const targetIndex = Math.floor(percent * records.length);
    const year = records[targetIndex + 1].date.getFullYear();
    return `[aria-label="${ year }"]`;
  }

  /** 打開對應的列表
   * @param searchLabel
   * @param isInTimeline
   * @returns
   */
  #openTimeMenu(searchLabel: string, isInTimeline: boolean) {
    if (!isInTimeline) return;

    const yearsPanel = document.querySelector(searchLabel);
    if (!yearsPanel) return;

    const ariaExpanded = yearsPanel.getAttribute('aria-expanded');
    if (ariaExpanded === "true") return;

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    yearsPanel.dispatchEvent(clickEvent);
  }

  /** 獲得月份轉換成menuitem的形式
   * @param records
   * @param monthGroup
   * @returns
   */
  #getMenuItems(records: TimeRecord[], monthGroup: Record<string, TimeRecord[]>) {
    return Object.entries(monthGroup).map(([x, y]) => ({
      label: (Number(x) + 1).toString().padStart(2, "0"),
      command: () => this.#scrollToTarget(records, y[0].date)
    }));
  }
}
