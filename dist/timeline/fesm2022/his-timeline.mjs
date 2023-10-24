import * as i0 from '@angular/core';
import { Injectable, EventEmitter, inject, ElementRef, Component, Input, Output, HostListener } from '@angular/core';
import * as i1 from 'primeng/panelmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import * as i3 from 'primeng/timeline';
import { TimelineModule } from 'primeng/timeline';
import '@his-base/array-extention';
import { NgClass, NgIf, DatePipe } from '@angular/common';
import * as i2 from 'primeng/api';
import * as i1$1 from 'primeng/listbox';
import { ListboxModule } from 'primeng/listbox';

class TimeMenuService {
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

/* eslint-disable @typescript-eslint/no-inferrable-types */
class TimeMenuComponent {
    constructor() {
        /** 點選 menu 觸發的事件 **/
        this.menuSelect = new EventEmitter();
        this.#timeMenuService = inject(TimeMenuService);
        this.#elementRef = inject(ElementRef);
    }
    #isMouseScroll;
    #timeMenuService;
    #elementRef;
    /** 監聽是否有滑鼠滾動時間軸
     * - 處理畫面上的連動
     */
    onTimelineScroll() {
        this.#timeMenuService.scrollHandler(this.#elementRef, this.value, this.#isMouseScroll);
    }
    /** 初始化資料
     * - 年月轉換成左邊的菜單，可使用的資料(MenuItems)
     * - 排序 timeline 資料
     */
    ngOnInit() {
        this.value.sort((x, y) => x.time.getTime() - y.time.getTime());
        this.yearMonths = this.#timeMenuService.getYearMonths(this.value);
    }
    /** 點選了中間時間軸的項目
     * @param timeItem 點選的那筆紀錄
     */
    onTimelineClick(timeItem) {
        this.selectedId = timeItem.id;
        this.menuSelect.emit(timeItem.subItems);
    }
    /** 當滑鼠移入時間軸
     * - 設定滑鼠滾動狀態
     */
    onMouseOver() {
        this.#isMouseScroll = true;
    }
    /** 當滑鼠移出時間軸
     * - 設定滑鼠滾動狀態
     */
    onMouseLeave() {
        this.#isMouseScroll = false;
    }
    /** 確認是不是被點選的項目
     * @param timeItem 每一筆紀錄
     * @returns true: 是 / false: 否
     */
    isItemClick(timeItem) {
        return timeItem.id === this.selectedId;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimeMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: TimeMenuComponent, isStandalone: true, selector: "his-time-menu", inputs: { value: "value" }, outputs: { menuSelect: "menuSelect" }, host: { listeners: { "scroll": "onTimelineScroll($event)" } }, ngImport: i0, template: "<!-- eslint-disable @angular-eslint/template/mouse-events-have-key-events -->\n\n<div class=\"timeMenuLayout\">\n  <div class=\"card flex justify-content-center scrollItem\">\n      <p-panelMenu [model]=\"yearMonths\" id=\"yearsPanel\"></p-panelMenu>\n  </div>\n\n  <div class=\"card scrollItem\" id=\"scrollContainer\" (scroll)=\"onTimelineScroll()\" (mouseover)=\"onMouseOver()\" (mouseleave)=\"onMouseLeave()\">\n    <p-timeline [value]=\"value\" id=\"timeline\">\n      <ng-template pTemplate=\"marker\" let-item>\n        <span class=\"custom-marker shadow-2 dot-style green-dot\" [ngClass]=\"{'orange-dot': isItemClick(item)}\"></span>\n        <span class=\"custom-connect eachconnent\" [ngClass]=\"{'eachconnent-select': isItemClick(item)}\"></span>\n      </ng-template>\n      <ng-template pTemplate=\"content\" let-item>\n        <div class=\"content-flex\">\n          <button (click)=\"onTimelineClick(item)\" class=\"button-time\" [ngClass]=\"{'button-time-selected': isItemClick(item)}\">\n            <div class=\"line-height\">\n              {{ item.time | date:'MM-dd' }} <br>\n              <span class=\"fontsize\" [ngClass]=\"{'fontsize-selected': isItemClick(item)}\">{{ item.subtitle }}</span><br>\n              <span class=\"fontsize-caption\" [ngClass]=\"{'fontsize-caption-selected': isItemClick(item)}\">{{ item.title }}</span>\n            </div>\n          </button>\n          <svg *ngIf=\"isItemClick(item)\" class=\"triangle-position\"  width=\"25\" height=\"25\" viewBox=\"-50 -50 300 300\" transform=\"rotate(270) scale(2)\">\n            <polygon class=\"triangle-circle\" stroke-linejoin=\"round\" points=\"100,0 0,200 200,200\"/>\n          </svg>\n        </div>\n      </ng-template>\n    </p-timeline>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: PanelMenuModule }, { kind: "component", type: i1.PanelMenu, selector: "p-panelMenu", inputs: ["model", "style", "styleClass", "multiple", "transitionOptions", "id", "tabindex"] }, { kind: "directive", type: i2.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: TimelineModule }, { kind: "component", type: i3.Timeline, selector: "p-timeline", inputs: ["value", "style", "styleClass", "align", "layout"] }, { kind: "pipe", type: DatePipe, name: "date" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimeMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-time-menu', standalone: true, imports: [NgClass, NgIf, PanelMenuModule, TimelineModule, DatePipe], template: "<!-- eslint-disable @angular-eslint/template/mouse-events-have-key-events -->\n\n<div class=\"timeMenuLayout\">\n  <div class=\"card flex justify-content-center scrollItem\">\n      <p-panelMenu [model]=\"yearMonths\" id=\"yearsPanel\"></p-panelMenu>\n  </div>\n\n  <div class=\"card scrollItem\" id=\"scrollContainer\" (scroll)=\"onTimelineScroll()\" (mouseover)=\"onMouseOver()\" (mouseleave)=\"onMouseLeave()\">\n    <p-timeline [value]=\"value\" id=\"timeline\">\n      <ng-template pTemplate=\"marker\" let-item>\n        <span class=\"custom-marker shadow-2 dot-style green-dot\" [ngClass]=\"{'orange-dot': isItemClick(item)}\"></span>\n        <span class=\"custom-connect eachconnent\" [ngClass]=\"{'eachconnent-select': isItemClick(item)}\"></span>\n      </ng-template>\n      <ng-template pTemplate=\"content\" let-item>\n        <div class=\"content-flex\">\n          <button (click)=\"onTimelineClick(item)\" class=\"button-time\" [ngClass]=\"{'button-time-selected': isItemClick(item)}\">\n            <div class=\"line-height\">\n              {{ item.time | date:'MM-dd' }} <br>\n              <span class=\"fontsize\" [ngClass]=\"{'fontsize-selected': isItemClick(item)}\">{{ item.subtitle }}</span><br>\n              <span class=\"fontsize-caption\" [ngClass]=\"{'fontsize-caption-selected': isItemClick(item)}\">{{ item.title }}</span>\n            </div>\n          </button>\n          <svg *ngIf=\"isItemClick(item)\" class=\"triangle-position\"  width=\"25\" height=\"25\" viewBox=\"-50 -50 300 300\" transform=\"rotate(270) scale(2)\">\n            <polygon class=\"triangle-circle\" stroke-linejoin=\"round\" points=\"100,0 0,200 200,200\"/>\n          </svg>\n        </div>\n      </ng-template>\n    </p-timeline>\n  </div>\n</div>\n" }]
        }], propDecorators: { value: [{
                type: Input
            }], menuSelect: [{
                type: Output
            }], onTimelineScroll: [{
                type: HostListener,
                args: ['scroll', ['$event']]
            }] } });

class TimeContentComponent {
    constructor() {
        /** 點選 content 觸發的事件 **/
        this.contentSelect = new EventEmitter();
    }
    /** 選擇紀錄
     * @param timeItem 點選的紀錄
     */
    onClick(timeItem) {
        this.contentSelect.emit(timeItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimeContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: TimeContentComponent, isStandalone: true, selector: "his-time-content", inputs: { value: "value" }, outputs: { contentSelect: "contentSelect" }, ngImport: i0, template: "<div class=\"card flex justify-content-center scrollItem\">\n  <p-listbox #listbox [options]=\"value\" optionLabel=\"title\" (click)=\"onClick(listbox.value)\" [emptyMessage]=\"' '\">\n    <ng-template let-item pTemplate=\"item\" >\n      <div class=\"content-flex\">\n          <span id=\"iconlocate\" class=\"material-symbols-outlined icon-frame\">\n            {{item.icon}}\n          </span>\n          <div class=\"timelist-time\"> {{item.time | date:'MM-dd HH:mm'}} </div>\n          <div class=\"timelist-title\"> {{item.title}} </div>\n      </div>\n    </ng-template>\n  </p-listbox>\n</div>\n", dependencies: [{ kind: "ngmodule", type: ListboxModule }, { kind: "component", type: i1$1.Listbox, selector: "p-listbox", inputs: ["multiple", "style", "styleClass", "listStyle", "listStyleClass", "readonly", "disabled", "checkbox", "filter", "filterBy", "filterMatchMode", "filterLocale", "metaKeySelection", "dataKey", "showToggleAll", "optionLabel", "optionValue", "optionGroupChildren", "optionGroupLabel", "optionDisabled", "ariaFilterLabel", "filterPlaceHolder", "emptyFilterMessage", "emptyMessage", "group", "options", "filterValue"], outputs: ["onChange", "onClick", "onDblClick"] }, { kind: "directive", type: i2.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "pipe", type: DatePipe, name: "date" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimeContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-time-content', standalone: true, imports: [NgClass, NgIf, ListboxModule, DatePipe], template: "<div class=\"card flex justify-content-center scrollItem\">\n  <p-listbox #listbox [options]=\"value\" optionLabel=\"title\" (click)=\"onClick(listbox.value)\" [emptyMessage]=\"' '\">\n    <ng-template let-item pTemplate=\"item\" >\n      <div class=\"content-flex\">\n          <span id=\"iconlocate\" class=\"material-symbols-outlined icon-frame\">\n            {{item.icon}}\n          </span>\n          <div class=\"timelist-time\"> {{item.time | date:'MM-dd HH:mm'}} </div>\n          <div class=\"timelist-title\"> {{item.title}} </div>\n      </div>\n    </ng-template>\n  </p-listbox>\n</div>\n" }]
        }], propDecorators: { value: [{
                type: Input
            }], contentSelect: [{
                type: Output
            }] } });

class TimelineComponent {
    constructor() {
        /** 輸出選擇的一筆資料 **/
        this.timeSelect = new EventEmitter();
    }
    /** 點選了中間時間軸的項目
     * @param timeItems 詳細資料，TimeItem 的 subItems
     */
    onMenuSelect(timeItems) {
        this.timeItems = timeItems;
    }
    /** 點選了右邊列表的項目
     * @param timeItem 最終選擇的資料
     */
    onContentSelect(timeItem) {
        this.timeSelect.emit(timeItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimelineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: TimelineComponent, isStandalone: true, selector: "his-timeline", inputs: { value: "value" }, outputs: { timeSelect: "timeSelect" }, ngImport: i0, template: "<div class=\"timelineLayout\">\n  <his-time-menu [value]=\"value\" (menuSelect)=\"onMenuSelect($event)\"></his-time-menu>\n  <his-time-content [value]=\"timeItems\" (contentSelect)=\"onContentSelect($event)\"></his-time-content>\n</div>\n\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0\" />\n", styles: ["@charset \"UTF-8\";@import\"primeng/resources/themes/lara-light-blue/theme.css\";@import\"primeng/resources/primeng.css\";@import\"primeicons/primeicons.css\";button{display:inline;background:none;border:none;padding:0;margin:0;font-size:inherit;color:inherit;cursor:pointer;width:80px}.timeMenuLayout,.timelineLayout{display:flex;flex-direction:row;justify-content:flex-start;height:70%}.outside{height:98vh;background-color:#eceded;padding:10px}.scrollItem{overflow:auto;scroll-behavior:smooth;-ms-overflow-style:none;scrollbar-width:none}.scrollItem::-webkit-scrollbar{display:none}#timeline{margin-right:5px}:host ::ng-deep .menuStyling{font-size:100px!important;font-weight:700!important;font-style:italic!important;font-family:cursive!important}.ulSelect{list-style-type:none;margin:0;padding:0;width:200px;background-color:#f1f1f1}.liSelect{display:block;color:#000;padding:8px 16px;text-decoration:none}.liSelect:hover{background-color:#555;color:#fff}.p-submenu-icon{display:none}.p-panelmenu{width:60px}.p-panelmenu .p-panelmenu-header>a:active{box-shadow:none;color:#006d50}.p-panelmenu .p-panelmenu-header:not(.p-disabled):focus .p-panelmenu-header-content{box-shadow:none}.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content{border:none}.p-panelmenu .p-panelmenu-content{border:none;background-color:#eceded}.ui-panelmenu .ui-panelmenu-header.ui-state-active{border-color:none}.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action{color:#000;padding:5px;justify-content:center}.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content{background-color:#eceded}.p-panelmenu .p-panelmenu-content .p-menuitem>.p-menuitem-content .p-menuitem-link{padding:5px;font-size:medium}.navigator{top:50%;right:10px}.p-listbox .p-listbox-list{padding:0!important}.p-listbox{border:0px;width:15rem}.p-listbox-width{width:15rem}.p-listbox .p-listbox-list .p-listbox-item.p-highlight{border-radius:var(--border-radius-rounded, 20px);border:1px solid var(--primary-main, #006D50);color:#fff;background:#006D50;box-shadow:none;color:var(--white, #FFF !important);font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:300;letter-spacing:.16px}.p-listbox .p-listbox-list .p-listbox-item{justify-content:space-between;margin:5px;padding:var(--spacing-xs, 4px) var(--spacing-md, 12px);border-bottom:solid 1px #B5BFBB;height:30px}.p-listbox .p-listbox-list .p-listbox-item:after{border-bottom:solid 1px #B5BFBB}.p-listbox-list{height:48vh}.box-border{position:relative;left:25px;width:50px;height:1px;border-bottom:1px solid #B5BFBB}.listbox-font{font-weight:300}::ng-deep .p-panelmenu .p-panelmenu-header.p-highlight>a{background-color:#ffa600}.p-panelmenu .p-panelmenu-header:not(.p-disabled).p-highlight .p-panelmenu-header-content{background-color:#fdd3a4!important;color:#006d50;border-radius:8px}.dot-style{border:0px solid #3C6353;border-radius:50%;width:1rem;height:1rem}.green-dot{background-color:#3c6353}.orange-dot{background-color:#c77516}.eachconnent{height:75px;width:2px;background-color:#dee2e6;flex-grow:1;transition:all .3s ease}.eachconnent-select{height:90px;width:2px;background-color:var(--tertiary-main, #C77516);flex-grow:1;transition:all .3s ease}.p-panelmenu .p-panelmenu-content .p-menuitem>.p-menuitem-content{border-radius:8px;width:50px;display:flex;justify-items:center;padding-left:8px;background-color:#eceded}.button-time{overflow:hidden;color:var(--surface-on-surface, #1C1D1C);text-overflow:ellipsis;font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;text-align:left}.fontsize{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:500;line-height:24px;letter-spacing:.16px}.fontsize-caption{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:14px;font-style:normal;font-weight:300;line-height:20px;letter-spacing:.14px}.button-time-selected{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:18px;font-style:normal;font-weight:400;line-height:24px;letter-spacing:.18px;text-align:left}.triangle:after{content:\"\";position:absolute;left:150px;top:5px;width:0;height:0;border-style:solid;border-width:8px 16px 8px 0;border-color:transparent #FFFFFF transparent transparent;z-index:99}.triangle-position{position:absolute;left:150px;top:5px}.triangle-circle{fill:#fff;stroke:#fff;stroke-width:30}.fontsize-selected{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:18px;font-style:normal;font-weight:500;line-height:24px;letter-spacing:.18px}.fontsize-caption-selected{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:300;line-height:24px;letter-spacing:.16px}.timelist-time{display:flex;align-items:center;font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px}.timelist-time:before{content:\"\\a0\"}.timelist-title{display:flex;align-items:center;font-family:Noto Sans TC;font-size:14px;font-style:normal;font-weight:300;line-height:20px;letter-spacing:.14px}.timelist-title:before{content:\"\\a0\\a0\"}.icon-transparent{color:transparent;font-size:24px}.icon-frame{height:24px;width:24px}.p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus>.p-menuitem-content{background-color:transparent}.content-flex{display:flex}.line-height{line-height:150%}\n"], dependencies: [{ kind: "component", type: TimeMenuComponent, selector: "his-time-menu", inputs: ["value"], outputs: ["menuSelect"] }, { kind: "component", type: TimeContentComponent, selector: "his-time-content", inputs: ["value"], outputs: ["contentSelect"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: TimelineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-timeline', standalone: true, imports: [TimeMenuComponent, TimeContentComponent], template: "<div class=\"timelineLayout\">\n  <his-time-menu [value]=\"value\" (menuSelect)=\"onMenuSelect($event)\"></his-time-menu>\n  <his-time-content [value]=\"timeItems\" (contentSelect)=\"onContentSelect($event)\"></his-time-content>\n</div>\n\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0\" />\n", styles: ["@charset \"UTF-8\";@import\"primeng/resources/themes/lara-light-blue/theme.css\";@import\"primeng/resources/primeng.css\";@import\"primeicons/primeicons.css\";button{display:inline;background:none;border:none;padding:0;margin:0;font-size:inherit;color:inherit;cursor:pointer;width:80px}.timeMenuLayout,.timelineLayout{display:flex;flex-direction:row;justify-content:flex-start;height:70%}.outside{height:98vh;background-color:#eceded;padding:10px}.scrollItem{overflow:auto;scroll-behavior:smooth;-ms-overflow-style:none;scrollbar-width:none}.scrollItem::-webkit-scrollbar{display:none}#timeline{margin-right:5px}:host ::ng-deep .menuStyling{font-size:100px!important;font-weight:700!important;font-style:italic!important;font-family:cursive!important}.ulSelect{list-style-type:none;margin:0;padding:0;width:200px;background-color:#f1f1f1}.liSelect{display:block;color:#000;padding:8px 16px;text-decoration:none}.liSelect:hover{background-color:#555;color:#fff}.p-submenu-icon{display:none}.p-panelmenu{width:60px}.p-panelmenu .p-panelmenu-header>a:active{box-shadow:none;color:#006d50}.p-panelmenu .p-panelmenu-header:not(.p-disabled):focus .p-panelmenu-header-content{box-shadow:none}.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content{border:none}.p-panelmenu .p-panelmenu-content{border:none;background-color:#eceded}.ui-panelmenu .ui-panelmenu-header.ui-state-active{border-color:none}.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action{color:#000;padding:5px;justify-content:center}.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content{background-color:#eceded}.p-panelmenu .p-panelmenu-content .p-menuitem>.p-menuitem-content .p-menuitem-link{padding:5px;font-size:medium}.navigator{top:50%;right:10px}.p-listbox .p-listbox-list{padding:0!important}.p-listbox{border:0px;width:15rem}.p-listbox-width{width:15rem}.p-listbox .p-listbox-list .p-listbox-item.p-highlight{border-radius:var(--border-radius-rounded, 20px);border:1px solid var(--primary-main, #006D50);color:#fff;background:#006D50;box-shadow:none;color:var(--white, #FFF !important);font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:300;letter-spacing:.16px}.p-listbox .p-listbox-list .p-listbox-item{justify-content:space-between;margin:5px;padding:var(--spacing-xs, 4px) var(--spacing-md, 12px);border-bottom:solid 1px #B5BFBB;height:30px}.p-listbox .p-listbox-list .p-listbox-item:after{border-bottom:solid 1px #B5BFBB}.p-listbox-list{height:48vh}.box-border{position:relative;left:25px;width:50px;height:1px;border-bottom:1px solid #B5BFBB}.listbox-font{font-weight:300}::ng-deep .p-panelmenu .p-panelmenu-header.p-highlight>a{background-color:#ffa600}.p-panelmenu .p-panelmenu-header:not(.p-disabled).p-highlight .p-panelmenu-header-content{background-color:#fdd3a4!important;color:#006d50;border-radius:8px}.dot-style{border:0px solid #3C6353;border-radius:50%;width:1rem;height:1rem}.green-dot{background-color:#3c6353}.orange-dot{background-color:#c77516}.eachconnent{height:75px;width:2px;background-color:#dee2e6;flex-grow:1;transition:all .3s ease}.eachconnent-select{height:90px;width:2px;background-color:var(--tertiary-main, #C77516);flex-grow:1;transition:all .3s ease}.p-panelmenu .p-panelmenu-content .p-menuitem>.p-menuitem-content{border-radius:8px;width:50px;display:flex;justify-items:center;padding-left:8px;background-color:#eceded}.button-time{overflow:hidden;color:var(--surface-on-surface, #1C1D1C);text-overflow:ellipsis;font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;text-align:left}.fontsize{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:500;line-height:24px;letter-spacing:.16px}.fontsize-caption{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:14px;font-style:normal;font-weight:300;line-height:20px;letter-spacing:.14px}.button-time-selected{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:18px;font-style:normal;font-weight:400;line-height:24px;letter-spacing:.18px;text-align:left}.triangle:after{content:\"\";position:absolute;left:150px;top:5px;width:0;height:0;border-style:solid;border-width:8px 16px 8px 0;border-color:transparent #FFFFFF transparent transparent;z-index:99}.triangle-position{position:absolute;left:150px;top:5px}.triangle-circle{fill:#fff;stroke:#fff;stroke-width:30}.fontsize-selected{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:18px;font-style:normal;font-weight:500;line-height:24px;letter-spacing:.18px}.fontsize-caption-selected{color:var(--surface-on-surface, #1C1D1C);font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:300;line-height:24px;letter-spacing:.16px}.timelist-time{display:flex;align-items:center;font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px}.timelist-time:before{content:\"\\a0\"}.timelist-title{display:flex;align-items:center;font-family:Noto Sans TC;font-size:14px;font-style:normal;font-weight:300;line-height:20px;letter-spacing:.14px}.timelist-title:before{content:\"\\a0\\a0\"}.icon-transparent{color:transparent;font-size:24px}.icon-frame{height:24px;width:24px}.p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus>.p-menuitem-content{background-color:transparent}.content-flex{display:flex}.line-height{line-height:150%}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], timeSelect: [{
                type: Output
            }] } });

/*
 * Public API Surface of timeline
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TimelineComponent };
//# sourceMappingURL=his-timeline.mjs.map
