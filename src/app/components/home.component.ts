import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <div class="welcome-card">
        <h1>Welcome to Budgie! 💰</h1>
        <p>Your personal budget management app</p>

        <div class="features">
          <div class="feature">
            <span class="icon">📊</span>
            <h3>Track Expenses</h3>
            <p>Monitor your spending across categories</p>
          </div>

          <div class="feature">
            <span class="icon">🎯</span>
            <h3>Set Budgets</h3>
            <p>Create monthly budgets and stay on track</p>
          </div>

          <div class="feature">
            <span class="icon">📈</span>
            <h3>View Reports</h3>
            <p>Analyze your financial patterns</p>
          </div>
        </div>

        <button class="logout-btn" (click)="logout()">Sign Out</button>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
      }

      .welcome-card {
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        max-width: 600px;
        text-align: center;
      }

      h1 {
        color: #333;
        margin-bottom: 10px;
        font-size: 32px;
      }

      p {
        color: #666;
        margin-bottom: 40px;
        font-size: 16px;
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 30px;
        margin-bottom: 40px;
      }

      .feature {
        text-align: center;
      }

      .icon {
        font-size: 48px;
        display: block;
        margin-bottom: 15px;
      }

      .feature h3 {
        color: #333;
        margin-bottom: 10px;
        font-size: 18px;
      }

      .feature p {
        color: #666;
        font-size: 14px;
        margin: 0;
      }

      .logout-btn {
        padding: 12px 24px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: background 0.3s;
      }

      .logout-btn:hover {
        background: #c82333;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout(): void {
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
}
