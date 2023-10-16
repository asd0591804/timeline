/** input進來的原始資料 */
export interface TimeItem {
  id: string;
  date: Date;
  title: string;
  subtitle: string;
  icon?: string;
  subItems?: TimeItem[];
}
