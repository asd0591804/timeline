export interface TimeRecord{
  date: Date;
  title: string;
  subtitle: string;
  id: string;
  icon?: string;
  subrecord?: TimeRecord[];
}

export interface DetailData{
  selected: boolean;
  time: string;
  title: string;
  subtitle: string;
  detail: string;
  id: string;
}
