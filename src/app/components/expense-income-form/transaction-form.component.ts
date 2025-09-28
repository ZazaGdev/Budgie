import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  transactionForm = new FormGroup({
    transactionType: new FormControl('expense'),
    transactionCategory: new FormControl(''),
    transactionAmount: new FormControl(0),
    transactionDate: new FormControl(new Date().toISOString().substring(0, 10)),
  });
  onSubmit() {
    // Handle form submission logic here
  }
}
