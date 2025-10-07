import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
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
export class HomeComponent implements OnInit {
  transactionService = inject(TransactionService);

  constructor() {
    // Removed initialization from here
  }

  ngOnInit() {
    this.transactionService.initialize();
  }
}
