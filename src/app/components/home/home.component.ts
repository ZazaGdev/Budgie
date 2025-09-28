import { Component } from '@angular/core';
import { TransactionFormComponent } from '../expense-income-form/transaction-form.component';
import { WidgetCardComponent } from '../shared/widget-card/widget-card.component';

@Component({
  selector: 'app-home',
  imports: [WidgetCardComponent, TransactionFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
