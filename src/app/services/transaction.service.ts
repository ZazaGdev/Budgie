import { computed, Injectable, signal } from '@angular/core';
import { Transaction, TransactionRaw } from '../models/transaction.model';
import { generateUID } from '../utils/uid.util';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _transactions = signal<any[]>([]);
  public readonly transactions = this._transactions.asReadonly();

  public readonly totalIncome = computed(() =>
    this._transactions()
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  public readonly totalExpenses = computed(() =>
    this._transactions()
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  public readonly netTotal = computed(() => this.totalIncome() - this.totalExpenses());

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

  async generateDummyData(): Promise<void> {
    await this.delay(Math.random() * 250);

    const dummyTransactions = this.createRealisticDummyData();

    // Add to existing transactions
    const currentTransactions = this._transactions();
    const updatedTransactions = [...currentTransactions, ...dummyTransactions];

    this._transactions.set(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  }

  async clearAllData(): Promise<void> {
    await this.delay(Math.random() * 250);

    this._transactions.set([]);
    localStorage.removeItem('transactions');
  }

  private createRealisticDummyData(): Transaction[] {
    const transactions: Transaction[] = [];
    const now = new Date();

    // Common expense categories with realistic amounts
    const expenseCategories = [
      { id: '1.1.1', name: 'Fine Dining', minAmount: 45, maxAmount: 150 },
      { id: '1.1.2', name: 'Casual Dining', minAmount: 15, maxAmount: 45 },
      { id: '1.2.1', name: 'Groceries', minAmount: 25, maxAmount: 120 },
      { id: '1.3.1', name: 'Coffee Shops', minAmount: 4, maxAmount: 12 },
      { id: '2.1.1', name: 'Fuel', minAmount: 30, maxAmount: 80 },
      { id: '2.1.2', name: 'Maintenance', minAmount: 50, maxAmount: 300 },
      { id: '2.2.1', name: 'Bus', minAmount: 2, maxAmount: 8 },
    ];

    // Income categories
    const incomeCategories = [
      { id: '3.1.1', name: 'Salary', minAmount: 2500, maxAmount: 4500 },
      { id: '3.2.1', name: 'Freelance', minAmount: 200, maxAmount: 800 },
    ];

    // Generate transactions for the last 2 months
    for (let monthOffset = 0; monthOffset < 2; monthOffset++) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
      const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

      // Monthly salary (1-2 times per month)
      const salariesCount = Math.random() > 0.5 ? 2 : 1;
      for (let i = 0; i < salariesCount; i++) {
        const salaryDay =
          i === 0 ? Math.floor(Math.random() * 15) + 1 : Math.floor(Math.random() * 15) + 16;
        const salaryDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), salaryDay);

        transactions.push({
          id: generateUID(),
          type: 'income',
          date: salaryDate,
          amount: Math.floor(
            Math.random() * (incomeCategories[0].maxAmount - incomeCategories[0].minAmount) +
              incomeCategories[0].minAmount
          ),
          note: 'Monthly salary payment',
          category: { id: incomeCategories[0].id, name: incomeCategories[0].name },
        });
      }

      // Occasional freelance income
      if (Math.random() > 0.6) {
        const freelanceDay = Math.floor(Math.random() * daysInMonth) + 1;
        const freelanceDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), freelanceDay);

        transactions.push({
          id: generateUID(),
          type: 'income',
          date: freelanceDate,
          amount: Math.floor(
            Math.random() * (incomeCategories[1].maxAmount - incomeCategories[1].minAmount) +
              incomeCategories[1].minAmount
          ),
          note: 'Freelance project payment',
          category: { id: incomeCategories[1].id, name: incomeCategories[1].name },
        });
      }

      // Generate realistic expenses throughout the month
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
        const dayOfWeek = currentDate.getDay();

        // More transactions on weekends and weekdays
        const transactionsPerDay =
          dayOfWeek === 0 || dayOfWeek === 6
            ? Math.floor(Math.random() * 4)
            : Math.floor(Math.random() * 3);

        for (let t = 0; t < transactionsPerDay; t++) {
          if (Math.random() > 0.3) {
            // 70% chance of having a transaction
            const category =
              expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
            const amount = Math.floor(
              Math.random() * (category.maxAmount - category.minAmount) + category.minAmount
            );

            // Add some realistic variation to amounts
            const finalAmount = Math.round(amount * (0.8 + Math.random() * 0.4) * 100) / 100;

            const notes = this.getRealisticNote(category.name, finalAmount);

            transactions.push({
              id: generateUID(),
              type: 'expense',
              date: new Date(currentDate.getTime() + Math.random() * 24 * 60 * 60 * 1000), // Random time of day
              amount: finalAmount,
              note: notes,
              category: { id: category.id, name: category.name },
            });
          }
        }
      }
    }

    // Sort by date (newest first)
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private getRealisticNote(categoryName: string, amount: number): string {
    const notes: { [key: string]: string[] } = {
      'Fine Dining': [
        'Anniversary dinner at downtown restaurant',
        'Business dinner with clients',
        'Date night at Italian restaurant',
        'Celebration dinner for promotion',
        'Weekend fine dining experience',
      ],
      'Casual Dining': [
        'Lunch with friends',
        'Quick dinner after work',
        'Family meal at local restaurant',
        'Weekend brunch',
        'Takeout for busy evening',
      ],
      Groceries: [
        'Weekly grocery shopping',
        'Fresh produce and essentials',
        'Monthly bulk shopping',
        'Organic groceries',
        'Emergency grocery run',
      ],
      'Coffee Shops': [
        'Morning coffee before work',
        'Afternoon coffee break',
        'Coffee meeting with colleague',
        'Weekend coffee and pastry',
        'Study session at coffee shop',
      ],
      Fuel: [
        'Weekly gas fill-up',
        'Road trip fuel',
        'Emergency gas station visit',
        'Monthly fuel expense',
        'Commute fuel cost',
      ],
      Maintenance: [
        'Car oil change and service',
        'Tire replacement',
        'Brake pad replacement',
        'Monthly car maintenance',
        'Emergency car repair',
      ],
      Bus: [
        'Daily commute to work',
        'Weekend city transport',
        'Monthly bus pass',
        'Airport shuttle',
        'Public transport for errands',
      ],
    };

    const categoryNotes = notes[categoryName] || ['Transaction'];
    return categoryNotes[Math.floor(Math.random() * categoryNotes.length)];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
