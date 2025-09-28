import { Component } from '@angular/core';
import { WidgetCardComponent } from '../shared/widget-card/widget-card.component';
import { TransactionFormComponent } from '../transactions/transaction-form/transaction-form.component';

@Component({
  selector: 'app-home',
  imports: [WidgetCardComponent, TransactionFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
