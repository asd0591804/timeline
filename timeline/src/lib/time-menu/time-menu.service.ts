import { ElementRef, Injectable } from '@angular/core';
import { TimeItem } from 'timeline/src/lib/timeline.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeMenuService {

  /** 取得左側年月菜單可讀取 menuitem
   * @param timeItems 所有的資料
   * @returns 年月菜單(menuItems)
   */
  getYearMonth(timeItems: TimeItem[]) {
    const groupedValue = this.#group(timeItems);

    return this.#getTimeMenus(timeItems, groupedValue);
  }

  /** 監聽畫面的滾動，使年份與時間軸達成一致
   * @param elementRef DOM元素的訪問與操作
   * @param timeItems 所有資料
   * @param isMouseScrolling 是否滑鼠在滾動
   */
  scrollHandler(elementRef: ElementRef, timeItems: TimeItem[], isMouseScrolling: boolean) {
    const scrollContainer = elementRef.nativeElement.querySelector('#scrollContainer');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollContainer || timeline.offsetHeight === 0) return;

    const percent = (scrollContainer.scrollTop / timeline.offsetHeight);
    const searchLabel = this.#getYearLabel(timeItems, percent);
    this.#openTimeMenu(searchLabel, isMouseScrolling);
  }

  /** 將資料分組
   * @param timeItems 所有的資料
   * @returns 以年份劃分的資料
   */
  #group(timeItems: TimeItem[]) {
    const sortedValue = timeItems.sort((x, y) => x.date.getTime() - y.date.getTime());
    return sortedValue.groupBy(x => x.date.getFullYear());
  }

  /** 將年份 月份 轉換成 menuitems
   * @param timeItems 所有的資料
   * @param groupedValue 以年份劃分的資料
   * @returns 菜單所使用的 Menuitems
   */
  #getTimeMenus(timeItems: TimeItem[], groupedValue: Record<string, TimeItem[]>) {
    return Object.entries(groupedValue).map(([x, y]) => {
      const label = JSON.parse(x);

      const monthGroup = y.groupBy(z => z.date.getMonth());
      const items = this.#getTimeItems(timeItems, monthGroup);
      return { label, items };
    })
  }

  /** 獲得月份轉換成 menu 的 items
   * @param timeItems 所有的資料
   * @param monthGroup 以月份劃分的資料
   * @returns 菜單 (MenuItem) 所使用的 items
   */
  #getTimeItems(timeItems: TimeItem[], monthGroup: Record<string, TimeItem[]>) {
    return Object.entries(monthGroup).map(([x, y]) => ({
      label: (Number(x) + 1).toString().padStart(2, "0"),
      command: () => this.#moveTo(timeItems, y[0].date)
    }));
  }

  /** 點選時間後，跳到對應的時間軸
   * @param timeItems 所有的資料，用來判斷比例的基準值
   * @param target 想要移動到的目標
   */
  #moveTo(timeItems: TimeItem[], target: Date) {
    if (!timeItems) return;

    const scrollContainer = document.getElementById('scrollContainer');
    const timeline = document.getElementById('timeline');
    if (!timeline || !scrollContainer) return;

    const selectedIndex = timeItems.findIndex(x => x.date === target);
    const recordLength = timeItems.length;
    const percent = selectedIndex / recordLength;
    const targetHeight = percent * timeline.offsetHeight - 10;
    scrollContainer.scrollTo(0, targetHeight);
  }

  /** 依滾輪取得的目前高度去尋找對應的年份
   * @param timeItems 所有的資料，用來找出目標
   * @param percent 目標的比例
   * @returns 目標年份
   */
  #getYearLabel(timeItems: TimeItem[], percent: number) {
    const targetIndex = Math.floor(percent * timeItems.length) + 1;
    const year = timeItems[targetIndex].date.getFullYear();
    return `[aria-label="${ year }"]`;
  }

  /** 打開對應的菜單
   * @param searchLabel 對應的年份
   * @param isMouseScrolling 是否是滑鼠觸發的滾動
   */
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
