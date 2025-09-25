import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Olympic } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';
import { ChartUtilsService } from '../../core/services/chart-utils.service';
import { SubscriptionManagerService } from '../../core/services/subscription-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [SubscriptionManagerService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Chart configuration for ngx-charts
  public pieChartData: any[] = [];
  public colorScheme: any;

  // Responsive chart configuration
  public chartView: [number, number] = [700, 400];

  // Dashboard stats
  public totalCountries: number = 0;
  public totalJOs: number = 0;

  constructor(
    private olympicService: OlympicService,
    private chartUtils: ChartUtilsService,
    private subscriptionManager: SubscriptionManagerService
  ) {
    this.colorScheme = this.chartUtils.colorScheme;
  }

  ngOnInit(): void {
    this.updateChartSize();
    this.subscriptionManager.add(
      this.olympicService.getOlympics().subscribe((olympics: Olympic[] | null) => {
        if (olympics) {
          this.updateDashboardData(olympics);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribeAll();
  }

  private updateDashboardData(olympics: Olympic[]): void {
    // Calculate total medals per country for pie chart
    this.pieChartData = olympics.map(olympic => {
      const totalMedals = olympic.participations.reduce(
        (total, participation) => total + participation.medalsCount,
        0
      );
      return {
        name: olympic.country,
        value: totalMedals
      };
    });


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

  public onSelect(event: any): void {
    console.log(`Navigate to country: ${event.name}`);
    this.chartUtils.navigateToCountryDetail(event.name);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateChartSize();
  }

  private updateChartSize(): void {
    this.chartView = this.chartUtils.calculateChartSize(700, 400);
  }
}
