import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { curveLinear } from 'd3-shape';
import { Olympic } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public country: Olympic | null = null;
  public countryName: string = '';

  // Line chart data for ngx-charts
  public lineChartData: any[] = [];
  public colorScheme: any = 'cool';
  public curve: any = curveLinear ;

  // Statistics
  public totalParticipations: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    // Get country name from route parameter
    this.countryName = this.route.snapshot.paramMap.get('countryName') || '';

    // Subscribe to Olympic data and find the specific country
    this.subscription.add(
      this.olympicService.getOlympics().subscribe((olympics: Olympic[] | null) => {
        if (olympics) {
          this.country = olympics.find(olympic =>
            olympic.country.toLowerCase() === this.countryName.toLowerCase()
          ) || null;

          if (this.country) {
            this.updateCountryData();
          } else {
            // Country not found, redirect to 404 or home
            this.router.navigate(['/']);
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateCountryData(): void {
    if (!this.country) return;

    // Prepare line chart data: medals per Olympic year
    this.lineChartData = [{
      name: this.country.country,
      series: this.country.participations.map(participation => ({
        name: participation.year.toString(),
        value: participation.medalsCount
      })).sort((a, b) => parseInt(a.name) - parseInt(b.name)) // Sort by year
    }];

    // Calculate statistics
    this.totalParticipations = this.country.participations.length;
    this.totalMedals = this.country.participations.reduce(
      (total, participation) => total + participation.medalsCount, 0
    );
    this.totalAthletes = this.country.participations.reduce(
      (total, participation) => total + participation.athleteCount, 0
    );
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
