import { ElementRef, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TimeItem } from 'timeline/src/lib/timeline.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeMenuService {

  /** 取得左側年月菜單
   * @param timeItems 所有的資料
   * @returns 年月菜單
   */
  getYearMonth(timeItems: TimeItem[]): MenuItem[] {

    const groupYears = timeItems.groupBy(x => x.time.getFullYear());

    return Object.entries(groupYears).map(([x,y]) => {
      const label = `${x}`;

      const groupMonths = y.groupBy(z => z.time.getMonth());
      const items = this.#getMonthItems(timeItems, groupMonths);
      return {label, items};
    });
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

  /** 獲得月份轉換成的 items
   * @param timeItems 傳入 timeline 的資料
   * @param record 以月份劃分的資料
   * @returns 菜單所使用的 items
   */
  #getMonthItems(timeItems: TimeItem[], record: Record<string, TimeItem[]>){

    return Object.entries(record).map(([x, y]) => ({
      label: (Number(x) + 1).toString().padStart(2, "0"),
      command: () => this.#moveTo(timeItems, y[0].id)
    }));
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
