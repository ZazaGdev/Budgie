import { Component } from '@angular/core';
import { WidgetCardComponent } from '../shared/widget-card/widget-card.component';
import { TransactionFormComponent } from '../transactions/transaction-form/transaction-form.component';
import { TransactionList } from '../transactions/transaction-list/transaction-list';

@Component({
  selector: 'app-home',
  imports: [WidgetCardComponent, TransactionFormComponent, TransactionList],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
