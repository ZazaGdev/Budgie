import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Category } from '../../../models/category.model';

import { TransactionRaw } from '../../../models/transaction.model';
import { CategoriesService } from '../../../services/categories.service';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  transactionService = inject(TransactionService);

  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];

  transactionForm = new FormGroup({
    transactionType: new FormControl('expense' as 'expense' | 'income', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    transactionCategory: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    transactionAmount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
    transactionDate: new FormControl(new Date().toISOString().substring(0, 10), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    transactionNote: new FormControl('', { nonNullable: true }),
  });

  async ngOnInit() {
    await this.categoriesService.setInitialCategories();
    this.categories = await this.categoriesService.getFlatCategories();
    this.cdr.detectChanges();
    console.log(this.categories);
  }

  onSubmit() {
    const data: TransactionRaw = {
      type: this.transactionForm.value.transactionType as 'income' | 'expense',
      amount: this.transactionForm.value.transactionAmount as number,
      note: this.transactionForm.value.transactionNote as string,
      category: {
        id: this.transactionForm.value.transactionCategory!,
        name:
          this.categories.find(cat => cat.id === this.transactionForm.value.transactionCategory!)
            ?.name || '',
      },
    };
    console.log(data);
    this.transactionService.add(data);
  }
}
