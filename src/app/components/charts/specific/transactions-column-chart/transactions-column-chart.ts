import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { TransactionService } from '../../../../services/transaction.service';
import { StackedColumnChartComponent } from '../../raw/stacked-column-chart/stacked-column-chart.component';
import { ChartConfig, ChartData } from '../../raw/stacked-column-chart/stacked-column-chart.models';

@Component({
  selector: 'transactions-column-chart',
  imports: [StackedColumnChartComponent],
  templateUrl: './transactions-column-chart.html',
  styleUrls: ['./transactions-column-chart.scss'],
})
export class TransactionsColumnChart {
  private transactionService = inject(TransactionService);
  private cdr = inject(ChangeDetectorRef);

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
}
