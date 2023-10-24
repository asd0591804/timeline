import { ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
import '@his-base/array-extention';
import * as i0 from "@angular/core";
export declare class TimeMenuService {
    #private;
    /** 取得左側年月菜單
     * @param timeItems 所有的資料
     * @returns 年月菜單
     */
    getYearMonths(timeItems: TimeItem[]): MenuItem[];
    /** 監聽畫面的滾動，使年份與時間軸達成一致
     * @param elementRef DOM 元素的訪問與操作
     * @param timeItems 傳入 timeline 的資料
     * @param isMouseScroll 是否滑鼠在滾動
     */
    scrollHandler(elementRef: ElementRef, timeItems: TimeItem[], isMouseScroll: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TimeMenuService>;
}
