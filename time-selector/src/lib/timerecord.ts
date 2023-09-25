export class TimeRecord{
  date!: Date
  title!: string
  subtitle!: string
  id!: string
  subrecord?: TimeRecord[];
}

export class DetailData{
  time!: string
  title!: string
  subtitle!: string
  detail!: string
  class!: object
  id!: string
}
