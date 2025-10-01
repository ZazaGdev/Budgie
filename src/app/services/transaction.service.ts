import { Injectable } from '@angular/core';
import { Transaction, TransactionRaw } from '../models/transaction.model';
import { generateUID } from '../utils/uid.util';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: any[] = [];

  async getAll() {
    await this.delay(Math.random() * 500);
    this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    return this.transactions;
  }

  async add(transaction: TransactionRaw) {
    await this.delay(Math.random() * 500);

    const transactionWithId: Transaction = {
      ...transaction,
      date: new Date(),
      id: generateUID(),
    };

    this.transactions.push(transactionWithId);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
