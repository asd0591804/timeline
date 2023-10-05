export interface TimeRecord {
  id: string;
  date: Date;
  title: string;
  subtitle: string;
  icon?: string;
  subRecord?: TimeRecord[];
}

export interface TimelineSubject {
  id: string;
  isSelected: boolean;
  time: string;
  title: string;
  subtitle: string;
}

export interface TimeContent {
  recordId: string;
  time: string;
  title: string;
  icon: string;
  hide: boolean;
}
