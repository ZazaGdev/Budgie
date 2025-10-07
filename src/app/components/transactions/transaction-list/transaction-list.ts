import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
@Component({
  selector: 'app-transaction-list',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList implements OnInit {
  transactionService = inject(TransactionService);
  transactions = this.transactionService.transactions;
  totalExpenses = this.transactionService.totalExpenses;
  totalIncome = this.transactionService.totalIncome;
  netTotal = this.transactionService.netTotal;

  async ngOnInit() {
    this.transactionService.initialize();
  }

  async deleteTransaction(id: string) {
    await this.transactionService.deleteTransaction(id);
  }
}
