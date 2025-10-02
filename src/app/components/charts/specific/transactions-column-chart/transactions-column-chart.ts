import { Component } from '@angular/core';
import { StackedColumnChartComponent } from '../../raw/stacked-column-chart/stacked-column-chart.component';
@Component({
  selector: 'transactions-column-chart',
  imports: [StackedColumnChartComponent],
  templateUrl: './transactions-column-chart.html',
  styleUrls: ['./transactions-column-chart.scss'],
})
export class TransactionsColumnChart {}
