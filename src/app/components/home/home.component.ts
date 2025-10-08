import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { IncomeExpensesColumnChart } from '../charts/specific/transactions-column-chart/income-expenses-column-chart';
import { WidgetCardComponent } from '../shared/widget-card/widget-card.component';
import { TransactionFormComponent } from '../transactions/transaction-form/transaction-form.component';
import { TransactionList } from '../transactions/transaction-list/transaction-list';
@Component({
  selector: 'app-home',
  imports: [
    WidgetCardComponent,
    TransactionFormComponent,
    TransactionList,
    IncomeExpensesColumnChart,
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

  async generateDummyData() {
    try {
      await this.transactionService.generateDummyData();
      console.log('✅ Generated 2 months of realistic dummy data');
    } catch (error) {
      console.error('❌ Error generating dummy data:', error);
    }
  }

  async clearAllData() {
    if (
      confirm('Are you sure you want to clear all transaction data? This action cannot be undone.')
    ) {
      try {
        await this.transactionService.clearAllData();
        console.log('✅ All transaction data cleared');
      } catch (error) {
        console.error('❌ Error clearing data:', error);
      }
    }
  }
}
