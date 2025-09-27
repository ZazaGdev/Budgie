import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(): void {
    // Use AuthService for authentication
    if (this.authService.login(this.email, this.password)) {
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
