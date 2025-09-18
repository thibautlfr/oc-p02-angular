import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartConfiguration, ChartType, ChartEvent, ActiveElement } from 'chart.js';
import { Subscription } from 'rxjs';
import { Olympic } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  // Chart configuration
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#956065',
        '#B8CBE7',
        '#89A1DB',
        '#793D52',
        '#9780A1',
        '#BFE0F1'
      ]
    }]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const countryName = context.label || '';
            const medalCount = context.parsed;
            return `${countryName}: ${medalCount} medals`;
          }
        }
      }
    }
  };

  // Dashboard stats
  public totalCountries: number = 0;
  public totalJOs: number = 0;

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.olympicService.getOlympics().subscribe((olympics: Olympic[] | null) => {
        if (olympics) {
          this.updateDashboardData(olympics);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateDashboardData(olympics: Olympic[]): void {
    // Calculate total medals per country for pie chart
    const chartLabels: string[] = [];
    const chartData: number[] = [];

    olympics.forEach(olympic => {
      const totalMedals = olympic.participations.reduce(
        (total, participation) => total + participation.medalsCount,
        0
      );
      chartLabels.push(olympic.country);
      chartData.push(totalMedals);
    });

    // Update chart data
    this.pieChartData = {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: this.pieChartData.datasets[0].backgroundColor
      }]
    };

    // Update stats
    this.totalCountries = olympics.length;
    // Count unique Olympic years across all participations
    const uniqueYears = new Set<number>();
    olympics.forEach(olympic => {
      olympic.participations.forEach(participation => {
        uniqueYears.add(participation.year);
      });
    });
    this.totalJOs = uniqueYears.size;
  }

  public onChartClick(event: any): void {
    const canvasPosition = event.event;
    const datasetIndex = event.active?.[0]?.datasetIndex;
    const index = event.active?.[0]?.index;

    if (index !== undefined && this.pieChartData.labels) {
      const countryName = this.pieChartData.labels[index];
      console.log(`Navigate to country: ${countryName}`);
      // TODO: Implement navigation to detail page
      // this.router.navigate(['/detail', countryName]);
    }
  }

  public onChartHover(event: any): void {
    // Chart hover handled by tooltip configuration
  }
}
