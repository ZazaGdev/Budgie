import { Injectable, OnInit } from '@angular/core';
import { defaultCategories } from '../data/categories';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements OnInit {
  async ngOnInit(): Promise<void> {
    await this.setInitialCategories();
  }

  async getAllCategories() {
    await this.delay(Math.random() * 500);
    return JSON.parse(localStorage.getItem('categories') || '[]');
  }

  async getFlatCategories() {
    await this.delay(Math.random() * 500);
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const flatCategories: Category[] = [];

    const flattenCategories = (categories: Category[]) => {
      for (const category of categories) {
        flatCategories.push(category);
        if (category?.children) {
          flattenCategories(category.children);
        }
      }
    };

    flattenCategories(categories);
    return flatCategories;
  }

  async setInitialCategories() {
    await this.delay(Math.random() * 500);
    if (!localStorage.getItem('categories')) {
      localStorage.setItem('categories', JSON.stringify(defaultCategories.categories));
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
