import { EventEmitter, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
import * as i0 from "@angular/core";
export declare class TimeMenuComponent implements OnInit {
    #private;
    /** 時間紀錄 **/
    value: TimeItem[];
    /** 點選 menu 觸發的事件 **/
    menuSelect: EventEmitter<TimeItem[]>;
    yearMonths: MenuItem[];
    selectedId: string;
    /** 監聽是否有滑鼠滾動時間軸
     * - 處理畫面上的連動
     */
    onTimelineScroll(): void;
    /** 初始化資料
     * - 年月轉換成左邊的菜單，可使用的資料(MenuItems)
     * - 排序 timeline 資料
     */
    ngOnInit(): void;
    /** 點選了中間時間軸的項目
     * @param timeItem 點選的那筆紀錄
     */
    onTimelineClick(timeItem: TimeItem): void;
    /** 當滑鼠移入時間軸
     * - 設定滑鼠滾動狀態
     */
    onMouseOver(): void;
    /** 當滑鼠移出時間軸
     * - 設定滑鼠滾動狀態
     */
    onMouseLeave(): void;
    /** 確認是不是被點選的項目
     * @param timeItem 每一筆紀錄
     * @returns true: 是 / false: 否
     */
    isItemClick(timeItem: TimeItem): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimeMenuComponent, "his-time-menu", never, { "value": { "alias": "value"; "required": false; }; }, { "menuSelect": "menuSelect"; }, never, never, true, never>;
}
