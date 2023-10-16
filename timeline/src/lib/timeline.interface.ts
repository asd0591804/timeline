/** 時間紀錄
 * - input進來的原始資料
 * */
export interface TimeItem {
  /** 辨識碼 */
  id: string;
  /** 時間 */
  date: Date;
  /** 醫師 */
  title: string;
  /** 看診類別 */
  subtitle: string;
  /** 每週總結標示（供住院使用） */
  icon?: string;
  /** 住院紀錄 */
  subItems?: TimeItem[];
}
