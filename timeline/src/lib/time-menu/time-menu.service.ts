import { ElementRef, Injectable } from '@angular/core';
import { TimeItem } from 'timeline/src/lib/timeline.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeMenuService {

  /** 取得左側年月列表可讀取 menuitem */
  getYearMonth(timeItems: TimeItem[]) {
    const sortedValue = this.#sortTime(timeItems);
    const groupedValue = this.#groupByTime(sortedValue);

    return this.#getTimeMenus(timeItems, groupedValue);
  }

  /** 監聽畫面的滾動，使年份與時間軸達成一致 */
  scrollTimeline(elementRef: ElementRef, timeItems: TimeItem[], isMouseScrolling: boolean) {
    const scrollTable = elementRef.nativeElement.querySelector('#scrollTable');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollTable || timeline.offsetHeight === 0) return;

    const percent = (scrollTable.scrollTop / timeline.offsetHeight);
    const searchLabel = this.#getYearLabel(timeItems, percent);
    this.#openTimeMenu(searchLabel, isMouseScrolling);
  }

  /** 排序資料 */
  #sortTime(timeItems: TimeItem[]) {
    return timeItems.sort((x, y) => x.date.getTime() - y.date.getTime());
  }

  /** 將資料分組 */
  #groupByTime(timeItems: TimeItem[]) {
    return timeItems.groupBy(x => [x.date.getFullYear()]);
  }

  /** 將年份 月份 轉換成 menuitems */
  #getTimeMenus(timeItems: TimeItem[], groupedValue: Record<string, TimeItem[]>){
    return Object.entries(groupedValue).map(([x, y]) => {
      const label = JSON.parse(x);

      const monthGroup = y.groupBy(z => z.date.getMonth());
      const items = this.#getTimeItems(timeItems, monthGroup);
      return { label, items };
    })
  }

  /** 獲得月份轉換成 menu 的 items */
  #getTimeItems(timeItems: TimeItem[], monthGroup: Record<string, TimeItem[]>) {
    return Object.entries(monthGroup).map(([x, y]) => ({
      label: (Number(x) + 1).toString().padStart(2, "0"),
      command: () => this.#scrollTo(timeItems, y[0].date)
    }));
  }

  /** 點選時間後，跳到對應的時間軸 */
  #scrollTo(timeItems: TimeItem[], target: Date) {
    if (!timeItems) return;

    const scrollBody = document.getElementById('scrollTable');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollBody) return;

    const selectedIndex = timeItems.findIndex(x => x.date === target);
    const recordLength = timeItems.length;
    const percent = selectedIndex / recordLength;
    const targetHeight = percent * timeline.offsetHeight - 10;
    scrollBody.scrollTo(0, targetHeight);
  }

  /** 依滾輪取得的目前高度去尋找對應的年份 */
  #getYearLabel(timeItems: TimeItem[], percent: number) {
    const targetIndex = Math.floor(percent * timeItems.length) + 1;
    const year = timeItems[targetIndex].date.getFullYear();
    return `[aria-label="${ year }"]`;
  }

  /** 打開對應的列表 */
  #openTimeMenu(searchLabel: string, isMouseScrolling: boolean) {
    if (!isMouseScrolling) return;

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
}
