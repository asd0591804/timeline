/** input進來的原始資料 */
export interface TimeRecord {
  id: string;
  date: Date;
  title: string;
  subtitle: string;
  icon?: string;
  subRecords?: TimeRecord[];
}

/** 將原始資料轉換成讓中間 timeline 使用的資料 */
export interface TimelineSubject {
  recordId: string;
  isSelected: boolean;
  time: string;
  title: string;
  subtitle: string;
}

/** 將原始資料轉換成讓右邊列表使用的資料 */
export interface TimeContent {
  recordId: string;
  time: string;
  title: string;
  icon?: string;
}
