import { EventEmitter } from '@angular/core';
import { TimeItem } from 'timeline/src/lib/timeline.interface';
import * as i0 from "@angular/core";
export declare class TimeContentComponent {
    /** 詳細記錄，讓其可以顯示在列表上 **/
    value: TimeItem[];
    /** 點選 content 觸發的事件 **/
    contentSelect: EventEmitter<TimeItem>;
    /** 選擇紀錄
     * @param timeItem 點選的紀錄
     */
    onClick(timeItem: TimeItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimeContentComponent, "his-time-content", never, { "value": { "alias": "value"; "required": false; }; }, { "contentSelect": "contentSelect"; }, never, never, true, never>;
}
