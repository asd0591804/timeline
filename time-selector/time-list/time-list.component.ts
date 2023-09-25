import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { TimeRecord } from 'time-selector/src/lib/timerecord';
import { TimeListService } from './time-list.service';

@Component({
  selector: 'his-time-list',
  standalone: true,
  imports: [CommonModule,ListboxModule,FormsModule],
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnChanges{

  @Input() list!: TimeRecord[];

  @Output() value = new EventEmitter();

  selectedList!: TimeRecord;
  listDetail!: object[];

  #timeListService: TimeListService = inject(TimeListService);

  ngOnChanges({list}: SimpleChanges): void {
    if(!list || !(list.currentValue)) return;

    this.listDetail = this.#timeListService.setInitial(this.list, this.listDetail);
  }

  onEmitFuntion(event: TimeRecord){
    const result = this.#timeListService.dataTransform(event, this.list);
    this.value.emit(result);
  }

}
