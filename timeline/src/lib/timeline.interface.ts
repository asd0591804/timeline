/** 時間紀錄
 * - input進來的原始資料
 * */
export interface TimeItem {
  /** 識別碼 */
  id: string;
  /** 時間 */
  date: Date;
  /** 標題
   * - 例如: 醫師
   * */
  title: string;
  /** 副標題
   * - 例如: 看診類別
   */
  subtitle: string;
  /** icon
   * - 例如: 住院的每週總結標示
   */
  icon?: string;
  /** 下一層的時間紀錄
   * - 例如: 詳細紀錄
   */
  subItems?: TimeItem[];
}
