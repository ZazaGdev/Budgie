import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
@Component({
  selector: 'app-transaction-list',
  imports: [DecimalPipe],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList implements OnInit {
  transactionService = inject(TransactionService);
  transactions = this.transactionService.transactions;

  async ngOnInit() {
    this.transactionService.initialize();
  }

  async deleteTransaction(id: string) {
    await this.transactionService.deleteTransaction(id);
  }
}
