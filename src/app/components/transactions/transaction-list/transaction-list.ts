import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  imports: [],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  transactionService = inject(TransactionService);
  transactions: Transaction[] = [];

  async ngOnInit() {
    this.transactions = await this.transactionService.getAll();
    this.cdr.detectChanges();
  }
  getTotalIncome(): number {
    return this.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getNetTotal(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  async deleteTransaction(id: string) {
    await this.transactionService.deleteTransaction(id);
    this.transactions = await this.transactionService.getAll();
    this.cdr.detectChanges();
  }
}
