import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChartUtilsService {

  // Common color scheme for charts
  public readonly colorScheme: any = 'cool';

  constructor(private router: Router) {}

  /**
   * Calculate responsive chart dimensions based on screen width
   * @param defaultWidth Default width for desktop
   * @param defaultHeight Default height for desktop
   * @returns [width, height] tuple
   */
  public calculateChartSize(defaultWidth: number = 700, defaultHeight: number = 400): [number, number] {
    const width = window.innerWidth;

    if (width <= 480) {
      // Mobile phones
      return [width - 40, 300];
    } else if (width <= 768) {
      // Tablets
      return [width - 60, 350];
    } else if (width <= 1024) {
      // Small laptops
      return [Math.min(defaultWidth - 100, 600), defaultHeight];
    } else {
      // Desktop
      return [defaultWidth, defaultHeight];
    }
  }

  /**
   * Navigate back to home page
   */
  public goBack(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navigate to a specific route
   * @param route Route path
   * @param params Optional parameters
   */
  public navigateTo(route: string, params?: any[]): void {
    if (params) {
      this.router.navigate([route, ...params]);
    } else {
      this.router.navigate([route]);
    }
  }

  /**
   * Navigate to country detail page
   * @param countryName Name of the country
   */
  public navigateToCountryDetail(countryName: string): void {
    this.navigateTo('/country', [countryName]);
  }
}