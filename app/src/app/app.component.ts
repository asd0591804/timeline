import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TimelineComponent } from 'timeline/src/public-api';
import { TimeRecord } from 'timeline/src/lib/timeline.interface';
import { AppService } from './app.service';

@Component({
  selector: 'his-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TimelineComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  records!: TimeRecord[];
  output!: TimeRecord;
  #appService: AppService = inject(AppService);

  ngOnInit() {
    this.records = this.#appService.initial();
  }

  onRecordSelected(record:TimeRecord) {
    this.output = record;
  }
}
