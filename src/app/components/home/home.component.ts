import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService, UserProfile } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="welcome-card">
        <!-- User Profile Section -->
        <div class="user-header" *ngIf="userProfile">
          <img [src]="userProfile.avatar" [alt]="userProfile.fullName" class="avatar" />
          <div class="user-info">
            <h1>Welcome back, {{ userProfile.firstName }}! 💰</h1>
            <p class="subtitle">{{ userProfile.email }}</p>
            <span class="account-type"
              >{{ userProfile.accountInfo.accountType | titlecase }} Member</span
            >
          </div>
        </div>

        <!-- Budget Summary -->
        <div class="budget-summary" *ngIf="userProfile">
          <h3>Budget Overview</h3>
          <div class="budget-stats">
            <div class="stat">
              <span class="label">Monthly Budget</span>
              <span class="value">{{ userProfile.budget.monthlyBudget | currency }}</span>
            </div>
            <div class="stat">
              <span class="label">Spent</span>
              <span class="value">{{ userProfile.budget.currentSpent | currency }}</span>
            </div>
            <div class="stat">
              <span class="label">Remaining</span>
              <span class="value">{{
                userProfile.budget.monthlyBudget - userProfile.budget.currentSpent | currency
              }}</span>
            </div>
            <div class="stat">
              <span class="label">Savings</span>
              <span class="value">{{ userProfile.budget.currentSavings | currency }}</span>
            </div>
          </div>

          <!-- Budget Progress Bar -->
          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="getBudgetPercentage()"></div>
            </div>
            <p class="progress-text">{{ getBudgetPercentage() }}% of budget used</p>
          </div>
        </div>

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

      .user-header {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
      }

      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
        border: 3px solid #667eea;
      }

      .user-info h1 {
        margin: 0 0 5px 0;
        font-size: 24px;
      }

      .subtitle {
        margin: 0 0 10px 0;
        color: #666;
        font-size: 14px;
      }

      .account-type {
        background: #667eea;
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .budget-summary {
        margin-bottom: 30px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
      }

      .budget-summary h3 {
        margin: 0 0 15px 0;
        color: #333;
      }

      .budget-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
      }

      .stat {
        text-align: center;
        padding: 10px;
        background: white;
        border-radius: 6px;
        border: 1px solid #e1e1e1;
      }

      .stat .label {
        display: block;
        font-size: 12px;
        color: #666;
        margin-bottom: 5px;
      }

      .stat .value {
        display: block;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .progress-section {
        text-align: center;
      }

      .progress-bar {
        width: 100%;
        height: 20px;
        background: #e9ecef;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #28a745, #ffc107, #dc3545);
        transition: width 0.3s ease;
      }

      .progress-text {
        margin: 0;
        font-size: 14px;
        color: #666;
      }
    `,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  userProfile: UserProfile | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Load user profile when component initializes
    this.userService
      .loadUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: profile => {
          this.userProfile = profile;
        },
        error: error => {
          console.error('Failed to load user profile:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBudgetPercentage(): number {
    if (!this.userProfile) return 0;
    const budget = this.userProfile.budget;
    return Math.round((budget.currentSpent / budget.monthlyBudget) * 100);
  }

  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
