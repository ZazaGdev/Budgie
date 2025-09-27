import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  dateOfBirth: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    theme: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      budgetAlerts: boolean;
    };
    language: string;
  };
  accountInfo: {
    memberSince: string;
    lastLogin: string;
    loginCount: number;
    isActive: boolean;
    accountType: string;
  };
  budget: {
    monthlyIncome: number;
    monthlyBudget: number;
    currentSpent: number;
    savingsGoal: number;
    currentSavings: number;
  };
}

interface UserData {
  user: UserProfile;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly dataPath = '/assets/data/user.json';
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Load user profile from JSON file
   */
  loadUserProfile(): Observable<UserProfile> {
    return this.http.get<UserData>(this.dataPath).pipe(
      tap(data => {
        this.userProfileSubject.next(data.user);
      }),
      map(data => data.user)
    );
  }

  /**
   * Get current user profile
   */
  getUserProfile(): Observable<UserProfile | null> {
    return this.userProfile$;
  }

  /**
   * Get user budget summary
   */
  getBudgetSummary(): Observable<any> {
    return this.userProfile$.pipe(
      tap(user => {
        if (!user) return null;

        const budget = user.budget;
        const remainingBudget = budget.monthlyBudget - budget.currentSpent;
        const spentPercentage = (budget.currentSpent / budget.monthlyBudget) * 100;
        const savingsPercentage = (budget.currentSavings / budget.savingsGoal) * 100;

        return {
          ...budget,
          remainingBudget,
          spentPercentage: Math.round(spentPercentage),
          savingsPercentage: Math.round(savingsPercentage),
          isOverBudget: budget.currentSpent > budget.monthlyBudget,
        };
      })
    );
  }

  /**
   * Update user preferences
   */
  updatePreferences(preferences: Partial<UserProfile['preferences']>): void {
    const currentUser = this.userProfileSubject.value;
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        preferences: { ...currentUser.preferences, ...preferences },
      };
      this.userProfileSubject.next(updatedUser);
    }
  }

  /**
   * Refresh user data
   */
  refreshUserProfile(): void {
    this.loadUserProfile().subscribe();
  }
}
