import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TimeSelectorComponent } from 'time-selector/src/public-api';

@Component({
  selector: 'his-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TimeSelectorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'showcase';
}
