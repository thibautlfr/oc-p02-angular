import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

  // Chart configuration for ngx-charts
  public pieChartData: any[] = [];

  public colorScheme = 'vivid';

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
    // TODO: Implement navigation to detail page
    // this.router.navigate(['/detail', event.name]);
  }

  public onActivate(event: any): void {
    // Chart hover handled by ngx-charts
  }

  public onDeactivate(event: any): void {
    // Chart hover handled by ngx-charts
  }
}
