import { Component, computed, inject, signal } from '@angular/core';
import { TransactionService } from '../../../../services/transaction.service';
import { StackedColumnChartComponent } from '../../raw/stacked-column-chart/stacked-column-chart.component';
import { ChartConfig, ChartData } from '../../raw/stacked-column-chart/stacked-column-chart.models';

@Component({
  selector: 'income-expenses-column-chart',
  imports: [StackedColumnChartComponent],
  templateUrl: './income-expenses-column-chart.html',
  styleUrls: ['./income-expenses-column-chart.scss'],
})
export class IncomeExpensesColumnChart {
  private transactionService = inject(TransactionService);
  currentTimeFrame = signal('monthly');

  chartData = computed<ChartData[]>(() => [
    {
      name: 'Income',
      data: [this.transactionService.totalIncome()],
    },
    {
      name: 'Expenses',
      data: [this.transactionService.totalExpenses()],
    },
  ]);

  chartConfig: ChartConfig = {
    categories: ['This Month'],
    height: 400,
    colors: ['#10B981', '#EF4444'],
    showToolbar: false,
    showLegend: true,
    horizontal: false,
  };

  setTimeFrame(frame: 'weekly' | 'monthly' | 'daily') {
    this.currentTimeFrame.set(frame);
    // Future implementation: Update chart data based on timeframe
  }
}
