import { Component } from '@angular/core';
import { WidgetCardComponent } from '../shared/widget-card/widget-card.component';

@Component({
  selector: 'app-home',
  imports: [WidgetCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
