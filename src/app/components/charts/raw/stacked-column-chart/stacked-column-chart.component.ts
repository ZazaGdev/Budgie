import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartConfig, ChartData, ChartOptions } from './stacked-column-chart.models';

@Component({
  selector: 'app-stacked-column-chart',
  imports: [NgApexchartsModule],
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.scss'],
})
export class StackedColumnChartComponent implements OnChanges {
  @ViewChild('chart') chart!: ChartComponent;
  private cdr = inject(ChangeDetectorRef);

  @Input() data: ChartData[] = [];
  @Input() config: ChartConfig = {
    categories: [],
    height: 350,
    horizontal: false,
    showToolbar: true,
    showLegend: true,
  };

  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    responsive: [],
    xaxis: {
      type: 'category',
      categories: [],
    },
    legend: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['config']) {
      this.updateChart();

      this.cdr.markForCheck();
    }
  }

  private updateChart() {
    this.chartOptions = {
      series: this.data,
      chart: {
        type: 'bar',
        height: this.config.height || 350,
        stacked: true,
        toolbar: {
          show: this.config.showToolbar ?? true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: this.config.horizontal ?? false,
        },
      },
      xaxis: {
        type: 'category',
        categories: this.config.categories,
      },
      legend: {
        show: this.config.showLegend ?? true,
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      colors: this.config.colors,
      title: this.config.title
        ? {
            text: this.config.title,
            style: {
              fontSize: '16px',
              fontWeight: 'bold',
            },
          }
        : undefined,
      dataLabels: {
        enabled: false,
      },
    };
  }
}
