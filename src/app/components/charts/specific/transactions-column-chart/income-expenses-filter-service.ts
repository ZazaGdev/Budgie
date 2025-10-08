import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  transactionService = inject(TransactionService);

  getDailyData() {
    // Future implementation: Filter transactions for daily data
  }
}
