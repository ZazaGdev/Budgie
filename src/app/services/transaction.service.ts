import { Injectable, signal } from '@angular/core';
import { Transaction, TransactionRaw } from '../models/transaction.model';
import { generateUID } from '../utils/uid.util';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _transactions = signal<any[]>([]);
  public readonly transactions = this._transactions.asReadonly();

  async getAll(): Promise<Transaction[]> {
    await this.delay(Math.random() * 250);

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    this._transactions.set(transactions);
    return transactions;
  }

  async add(transaction: TransactionRaw): Promise<Transaction> {
    await this.delay(Math.random() * 250);

    const transactionWithId: Transaction = {
      ...transaction,
      date: new Date(),
      id: generateUID(),
    };

    const currentTransactions = this._transactions();
    const updatedTransactions = [...currentTransactions, transactionWithId];

    this._transactions.set(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    return transactionWithId;
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.delay(Math.random() * 250);

    const updatedTransactions = this._transactions().filter(t => t.id !== id);
    this._transactions.set(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  }

  async initialize(): Promise<void> {
    await this.getAll();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
