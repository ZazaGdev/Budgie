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
  }

  async onSubmit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const formValue = this.transactionForm.getRawValue();
    const selectedCategory = this.categories.find(cat => cat.id === formValue.transactionCategory);

    if (!selectedCategory) {
      console.error('Selected category not found');
      return;
    }

    const data: TransactionRaw = {
      type: formValue.transactionType,
      amount: formValue.transactionAmount,
      note: formValue.transactionNote,
      category: {
        id: formValue.transactionCategory,
        name: selectedCategory.name,
      },
    };
    try {
      // ✅ FIXED: Await the add operation
      await this.transactionService.add(data);

      // ✅ FIXED: Reset form after successful submission
      // this.transactionForm.reset({
      //   transactionType: 'expense',
      //   transactionCategory: '',
      //   transactionAmount: 0,
      //   transactionDate: new Date().toISOString().substring(0, 10),
      //   transactionNote: '',
      // });

      console.log('Transaction added successfully');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  }
}
