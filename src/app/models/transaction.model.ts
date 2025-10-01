export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  date: Date;
  amount: number;
  note: string;
  category: { id: string; name: string };
}

export interface TransactionRaw {
  type: 'income' | 'expense';
  amount: number;
  note: string;
  category: { id: string; name: string };
}
