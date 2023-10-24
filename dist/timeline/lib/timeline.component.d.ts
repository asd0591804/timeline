import { EventEmitter } from '@angular/core';
import { TimeItem } from './timeline.interface';
import * as i0 from "@angular/core";
export declare class TimelineComponent {
    /** 時間紀錄，輸入給 time-menu 的資料 **/
    value: TimeItem[];
    /** 輸出選擇的一筆資料 **/
    timeSelect: EventEmitter<TimeItem>;
    timeItems: TimeItem[];
    /** 點選了中間時間軸的項目
     * @param timeItems 詳細資料，TimeItem 的 subItems
     */
    onMenuSelect(timeItems: TimeItem[]): void;
    /** 點選了右邊列表的項目
     * @param timeItem 最終選擇的資料
     */
    onContentSelect(timeItem: TimeItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimelineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimelineComponent, "his-timeline", never, { "value": { "alias": "value"; "required": false; }; }, { "timeSelect": "timeSelect"; }, never, never, true, never>;
}
