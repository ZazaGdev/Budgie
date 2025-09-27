import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-widget-card', // This is the custom element name you will use in HTML
  templateUrl: './widget-card.component.html',
  styleUrls: ['./widget-card.component.scss'],
})
export class WidgetCardComponent {
  @Input() title: string = ''; // Input for card title
}
