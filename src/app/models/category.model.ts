export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
  level: number;
  parentId: string | null;
  children: Category[];
}
