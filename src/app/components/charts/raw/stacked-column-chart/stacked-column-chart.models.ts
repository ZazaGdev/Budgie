import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
} from 'ng-apexcharts';
export interface ChartData {
  name: string;
  data: number[];
}

export interface ChartConfig {
  title?: string;
  height?: number;
  categories: string[];
  colors?: string[];
  horizontal?: boolean;
  showToolbar?: boolean;
  showLegend?: boolean;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  colors?: string[] | undefined; // Allow undefined for optional colors
  title?: any | undefined; // Allow undefined for optional title
};
