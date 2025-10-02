import { Component } from '@angular/core';
import { TransactionsColumnChart } from '../charts/specific/transactions-column-chart/transactions-column-chart';
import { WidgetCardComponent } from '../shared/widget-card/widget-card.component';
import { TransactionFormComponent } from '../transactions/transaction-form/transaction-form.component';
import { TransactionList } from '../transactions/transaction-list/transaction-list';
@Component({
  selector: 'app-home',
  imports: [
    WidgetCardComponent,
    TransactionFormComponent,
    TransactionList,
    TransactionsColumnChart,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}
}
