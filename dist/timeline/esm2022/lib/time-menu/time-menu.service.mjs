import { Injectable } from '@angular/core';
import '@his-base/array-extention';
import * as i0 from "@angular/core";
export class TimeMenuService {
    /** 取得左側年月菜單
     * @param timeItems 所有的資料
     * @returns 年月菜單
     */
    getYearMonths(timeItems) {
        const years = timeItems.groupBy(x => x.time.getFullYear());
        const menuItems = Object.entries(years).map(([label, times]) => {
            const months = times.devideBy(x => this.#getMonth(x.time.getMonth()));
            const items = months.map(y => ({ label: y.title, command: () => this.#moveTo(timeItems, y.data[0].id) }));
            return { label, items };
        });
        return menuItems;
    }
    /** 取得月份以及不足十位數補零
     * @param month date.getMonth() 所得
     * @returns 正確的月份
     */
    #getMonth(month) {
        return (month + 1).toString().padStart(2, "0");
    }
    /** 監聽畫面的滾動，使年份與時間軸達成一致
     * @param elementRef DOM 元素的訪問與操作
     * @param timeItems 傳入 timeline 的資料
     * @param isMouseScroll 是否滑鼠在滾動
     */
    scrollHandler(elementRef, timeItems, isMouseScroll) {
        const scrollContainer = elementRef.nativeElement.querySelector('#scrollContainer');
        const timeline = document.getElementById('timeline');
        if (!timeline || !scrollContainer || timeline.offsetHeight === 0)
            return;
        const percent = (scrollContainer.scrollTop / timeline.offsetHeight);
        const searchLabel = this.#getYearLabel(timeItems, percent);
        this.#openTimeMenu(searchLabel, isMouseScroll);
    }
    /** 點選時間後，跳到對應的時間軸
     * @param timeItems 傳入 timeline 的資料，用來判斷比例的基準值
     * @param target 想要移動到的目標
     */
    #moveTo(timeItems, target) {
        if (!timeItems)
            return;
        const scrollContainer = document.getElementById('scrollContainer');
        if (!scrollContainer)
            return;
        const timeline = document.getElementById('timeline');
        if (!timeline)
            return;
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
    #getYearLabel(timeItems, percent) {
        const i = Math.floor(percent * timeItems.length + 0.4);
        const year = timeItems[i].time.getFullYear();
        return `[aria-label="${year}"]`;
    }
    /** 打開對應的菜單
     * @param searchLabel 對應的年份
     * @param isMouseScroll 是否是滑鼠觸發的滾動
     */
    #openTimeMenu(searchLabel, isMouseScroll) {
        if (!isMouseScroll)
            return;
        const yearsPanel = document.querySelector(searchLabel);
        if (!yearsPanel)
            return;
        const ariaExpanded = yearsPanel.getAttribute('aria-expanded');
        if (ariaExpanded === "true")
            return;
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
        });
        yearsPanel.dispatchEvent(clickEvent);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimeMenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimeMenuService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimeMenuService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90aW1lbGluZS9zcmMvbGliL3RpbWUtbWVudS90aW1lLW1lbnUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZELE9BQU8sMkJBQTJCLENBQUM7O0FBS25DLE1BQU0sT0FBTyxlQUFlO0lBRTFCOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxTQUFxQjtRQUVqQyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUU1RCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pHLE9BQU8sRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxP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QyxDQUFDOzhHQS9GVSxlQUFlO2tIQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgVGltZUl0ZW0gfSBmcm9tICd0aW1lbGluZS9zcmMvbGliL3RpbWVsaW5lLmludGVyZmFjZSc7XG5pbXBvcnQgJ0BoaXMtYmFzZS9hcnJheS1leHRlbnRpb24nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lTWVudVNlcnZpY2Uge1xuXG4gIC8qKiDlj5blvpflt6blgbTlubTmnIjoj5zllq5cbiAgICogQHBhcmFtIHRpbWVJdGVtcyDmiYDmnInnmoTos4fmlplcbiAgICogQHJldHVybnMg5bm05pyI6I+c5ZauXG4gICAqL1xuICBnZXRZZWFyTW9udGhzKHRpbWVJdGVtczogVGltZUl0ZW1bXSk6IE1lbnVJdGVtW10ge1xuXG4gICAgY29uc3QgeWVhcnMgPSB0aW1lSXRlbXMuZ3JvdXBCeSh4ID0+IHgudGltZS5nZXRGdWxsWWVhcigpKTtcbiAgICBjb25zdCBtZW51SXRlbXMgPSBPYmplY3QuZW50cmllcyh5ZWFycykubWFwKChbbGFiZWwsdGltZXNdKSA9PiB7XG5cbiAgICAgIGNvbnN0IG1vbnRocyA9IHRpbWVzLmRldmlkZUJ5KHggPT4gdGhpcy4jZ2V0TW9udGgoeC50aW1lLmdldE1vbnRoKCkpKTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gbW9udGhzLm1hcCh5ID0+ICAoe2xhYmVsOiB5LnRpdGxlLCBjb21tYW5kOiAoKSA9PiB0aGlzLiNtb3ZlVG8odGltZUl0ZW1zLCB5LmRhdGFbMF0uaWQpfSkpO1xuICAgICAgcmV0dXJuIHtsYWJlbCwgaXRlbXN9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1lbnVJdGVtcztcbiAgfVxuXG4gIC8qKiDlj5blvpfmnIjku73ku6Xlj4rkuI3otrPljYHkvY3mlbjoo5zpm7ZcbiAgICogQHBhcmFtIG1vbnRoIGRhdGUuZ2V0TW9udGgoKSDmiYDlvpdcbiAgICogQHJldHVybnMg5q2j56K655qE5pyI5Lu9XG4gICAqL1xuICAjZ2V0TW9udGgobW9udGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIChtb250aCArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICB9XG5cbiAgLyoqIOebo+iBveeVq+mdoueahOa7vuWLle+8jOS9v+W5tOS7veiIh+aZgumWk+i7uOmBlOaIkOS4gOiHtFxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBET00g5YWD57Sg55qE6Kiq5ZWP6IiH5pON5L2cXG4gICAqIEBwYXJhbSB0aW1lSXRlbXMg5YKz5YWlIHRpbWVsaW5lIOeahOizh+aWmVxuICAgKiBAcGFyYW0gaXNNb3VzZVNjcm9sbCDmmK/lkKbmu5HpvKDlnKjmu77li5VcbiAgICovXG4gIHNjcm9sbEhhbmRsZXIoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgdGltZUl0ZW1zOiBUaW1lSXRlbVtdLCBpc01vdXNlU2Nyb2xsOiBib29sZWFuKSB7XG5cbiAgICBjb25zdCBzY3JvbGxDb250YWluZXIgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Njcm9sbENvbnRhaW5lcicpO1xuICAgIGNvbnN0IHRpbWVsaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVsaW5lJyk7XG4gICAgaWYgKCF0aW1lbGluZSB8fCAhc2Nyb2xsQ29udGFpbmVyIHx8IHRpbWVsaW5lLm9mZnNldEhlaWdodCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcGVyY2VudCA9IChzY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wIC8gdGltZWxpbmUub2Zmc2V0SGVpZ2h0KTtcbiAgICBjb25zdCBzZWFyY2hMYWJlbCA9IHRoaXMuI2dldFllYXJMYWJlbCh0aW1lSXRlbXMsIHBlcmNlbnQpO1xuICAgIHRoaXMuI29wZW5UaW1lTWVudShzZWFyY2hMYWJlbCwgaXNNb3VzZVNjcm9sbCk7XG4gIH1cblxuICAvKiog6bue6YG45pmC6ZaT5b6M77yM6Lez5Yiw5bCN5oeJ55qE5pmC6ZaT6Lu4XG4gICAqIEBwYXJhbSB0aW1lSXRlbXMg5YKz5YWlIHRpbWVsaW5lIOeahOizh+aWme+8jOeUqOS+huWIpOaWt+avlOS+i+eahOWfuua6luWAvFxuICAgKiBAcGFyYW0gdGFyZ2V0IOaDs+imgeenu+WLleWIsOeahOebruaomVxuICAgKi9cbiAgI21vdmVUbyh0aW1lSXRlbXM6IFRpbWVJdGVtW10sIHRhcmdldDogc3RyaW5nKSB7XG5cbiAgICBpZiAoIXRpbWVJdGVtcykgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njcm9sbENvbnRhaW5lcicpO1xuICAgIGlmICghc2Nyb2xsQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICBjb25zdCB0aW1lbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lbGluZScpO1xuICAgIGlmICghdGltZWxpbmUgKSByZXR1cm47XG5cbiAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGltZUl0ZW1zLmZpbmRJbmRleCh4ID0+IHguaWQgPT09IHRhcmdldCk7XG4gICAgY29uc3QgcGVyY2VudCA9IHNlbGVjdGVkSW5kZXggLyB0aW1lSXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IHRhcmdldEhlaWdodCA9IHBlcmNlbnQgKiB0aW1lbGluZS5vZmZzZXRIZWlnaHQgLSAxMDtcbiAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG8oMCwgdGFyZ2V0SGVpZ2h0KTtcbiAgfVxuXG4gIC8qKiDkvp3mu77ovKrlj5blvpfnmoTnm67liY3pq5jluqbljrvlsIvmib7lsI3mh4nnmoTlubTku71cbiAgICogQHBhcmFtIHRpbWVJdGVtcyDlgrPlhaUgdGltZWxpbmUg55qE6LOH5paZ77yM55So5L6G5om+5Ye655uu5qiZXG4gICAqIEBwYXJhbSBwZXJjZW50IOebruaomeeahOavlOS+i1xuICAgKiBAcmV0dXJucyDnm67mqJnlubTku71cbiAgICovXG4gICNnZXRZZWFyTGFiZWwodGltZUl0ZW1zOiBUaW1lSXRlbVtdLCBwZXJjZW50OiBudW1iZXIpIHtcblxuICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHBlcmNlbnQgKiB0aW1lSXRlbXMubGVuZ3RoICsgMC40KSA7XG4gICAgY29uc3QgeWVhciA9IHRpbWVJdGVtc1tpXS50aW1lLmdldEZ1bGxZZWFyKCk7XG4gICAgcmV0dXJuIGBbYXJpYS1sYWJlbD1cIiR7IHllYXIgfVwiXWA7XG4gIH1cblxuICAvKiog5omT6ZaL5bCN5oeJ55qE6I+c5ZauXG4gICAqIEBwYXJhbSBzZWFyY2hMYWJlbCDlsI3mh4nnmoTlubTku71cbiAgICogQHBhcmFtIGlzTW91c2VTY3JvbGwg5piv5ZCm5piv5ruR6byg6Ke455m855qE5ru+5YuVXG4gICAqL1xuICAjb3BlblRpbWVNZW51KHNlYXJjaExhYmVsOiBzdHJpbmcsIGlzTW91c2VTY3JvbGw6IGJvb2xlYW4pIHtcblxuICAgIGlmICghaXNNb3VzZVNjcm9sbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgeWVhcnNQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoTGFiZWwpO1xuICAgIGlmICgheWVhcnNQYW5lbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgYXJpYUV4cGFuZGVkID0geWVhcnNQYW5lbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICBpZiAoYXJpYUV4cGFuZGVkID09PSBcInRydWVcIikgcmV0dXJuO1xuXG4gICAgY29uc3QgY2xpY2tFdmVudCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgdmlldzogd2luZG93LFxuICAgIH0pO1xuICAgIHllYXJzUGFuZWwuZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcbiAgfVxufVxuIl19