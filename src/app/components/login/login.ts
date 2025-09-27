import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin(): void {
    // Simple demo authentication
    if (this.email === 'john.doe@example.com' && this.password === 'demo123') {
      console.log('Login successful!');
      // Navigate to home dashboard
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials! Use the demo login info.');
    }
  }

  isFormValid(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }
}
