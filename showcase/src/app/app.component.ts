import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TimeSelectorComponent } from 'time-selector/src/public-api';
import { TimeRecord } from 'time-selector/src/lib/timerecord';
import { AppService } from './app.service';

@Component({
  selector: 'his-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TimeSelectorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'showcase';

  record!: TimeRecord[];
  output!: TimeRecord;
  #appService: AppService = inject(AppService);
  ngOnInit(){
    this.record = this.#appService.setInitial();
  }

  onUpdateOutput(event:TimeRecord){
    this.output = event;
  }
}
