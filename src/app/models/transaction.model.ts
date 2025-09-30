export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  date: Date;
  amount: number;
  notes: string;
  category: { id: string; name: string };
}

export interface TransactionRaw {
  type: 'income' | 'expense';
  amount: number;
  notes: string;
  category: { id: string; name: string };
}
