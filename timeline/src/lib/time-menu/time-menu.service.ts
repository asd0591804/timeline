import { ElementRef, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
// import * as _ from 'lodash';
import '@his-base/array-extention';

@Injectable({
  providedIn: 'root'
})
export class TimeMenuService {

  /** 取得左側年月菜單
   * @param timeItems 所有的資料
   * @returns 年月菜單
   */
  getYearMonths(timeItems: TimeItem[]): MenuItem[] {

    const years = timeItems.groupBy(x => x.time.getFullYear());
    // const tmp = timeItems.devideBy(x => x.time.getFullYear());
    // console.log(tmp);

    const menuItems = Object.entries(years).map(([label,times]) => {

      // console.log(times);
      // const tmp2 = times.devideBy(x => x.time.getFullYear());
      // const tmp2 = times.devideBy(x => this.#getMonth(x.time.getMonth()));
      // console.log('tmp',tmp2);
      // console.log('tmp2',tmp2);

      const months = times.groupBy(x => x.time.getMonth());
      // const months = _.groupBy(times, item => item.time.getMonth());
      const items = Object.entries(months).map(([x, y]) => ({ label: this.#getMonth(x), command: () => this.#moveTo(timeItems, y[0].id)}));
      return {label, items};
    });

    return menuItems;
  }

  /**
   * 取得月份
   * @param month
   * @returns
   */
  #getMonth(month: string): string {
    return (Number(month) + 1).toString().padStart(2, "0");
    // return (month + 1).toString().padStart(2, "0");
    // month = month + 1;
    // if(month < 10){
    //   return `00${month}`;
    // }
    // return `0${month}`;
  }

  /** 監聽畫面的滾動，使年份與時間軸達成一致
   * @param elementRef DOM 元素的訪問與操作
   * @param timeItems 傳入 timeline 的資料
   * @param isMouseScroll 是否滑鼠在滾動
   */
  scrollHandler(elementRef: ElementRef, timeItems: TimeItem[], isMouseScroll: boolean) {

    const scrollContainer = elementRef.nativeElement.querySelector('#scrollContainer');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollContainer || timeline.offsetHeight === 0) return;

    const percent = (scrollContainer.scrollTop / timeline.offsetHeight);
    const searchLabel = this.#getYearLabel(timeItems, percent);
    this.#openTimeMenu(searchLabel, isMouseScroll);
  }

  /** 點選時間後，跳到對應的時間軸
   * @param timeItems 傳入 timeline 的資料，用來判斷比例的基準值
   * @param target 想要移動到的目標
   */
  #moveTo(timeItems: TimeItem[], target: string) {

    if (!timeItems) return;

    const scrollContainer = document.getElementById('scrollContainer');
    if (!scrollContainer) return;

    const timeline = document.getElementById('timeline');
    if (!timeline ) return;

    const selectedIndex = timeItems.findIndex(x => x.id === target);
    const percent = selectedIndex / timeItems.length;
    const targetHeight = percent * timeline.offsetHeight - 10;
    scrollContainer.scrollTo(0, targetHeight);
  }

  /** 依滾輪取得的目前高度去尋找對應的年份
   * @param timeItems 傳入 timeline 的資料，用來找出目標
   * @param percent 目標的比例
   * @returns 目標年份
   */
  #getYearLabel(timeItems: TimeItem[], percent: number) {

    const i = Math.floor(percent * timeItems.length + 0.4) ;
    const year = timeItems[i].time.getFullYear();
    return `[aria-label="${ year }"]`;
  }

  /** 打開對應的菜單
   * @param searchLabel 對應的年份
   * @param isMouseScroll 是否是滑鼠觸發的滾動
   */
  #openTimeMenu(searchLabel: string, isMouseScroll: boolean) {

    if (!isMouseScroll) return;

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
