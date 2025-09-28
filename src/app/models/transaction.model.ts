export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  date: Date;
  amount: number;
  notes: string;
  category: { id: string; name: string };
}
