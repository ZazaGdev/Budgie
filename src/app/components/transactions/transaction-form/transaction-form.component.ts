import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  allCategories = this.categoriesService.getFlatCategories();
  categories: Category[] = [];

  transactionForm = new FormGroup({
    transactionType: new FormControl('expense'),
    transactionCategory: new FormControl(''),
    transactionAmount: new FormControl(0),
    transactionDate: new FormControl(new Date().toISOString().substring(0, 10)),
    transactionNotes: new FormControl(''),
  });

  async ngOnInit() {
    await this.categoriesService.setInitialCategories();
    this.categories = await this.categoriesService.getFlatCategories();
    console.log(this.categories);
  }

  onSubmit() {
    // Handle form submission logic here
  }
}
