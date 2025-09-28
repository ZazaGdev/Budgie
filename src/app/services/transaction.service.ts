import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Transactions {
  private transactions: any[] = [];

  getAll() {
    return this.transactions;
  }
}
