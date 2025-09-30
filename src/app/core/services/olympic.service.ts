import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);
  private error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.error$.next(null);
      }),
      catchError((error) => {
        console.error('Error loading Olympic data:', error);

        let errorMessage = 'An error occurred while loading Olympic data.';

        if (error.status === 0) {
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        } else if (error.status === 404) {
          errorMessage = 'Olympic data file not found.';
        } else if (error.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }

        this.error$.next(errorMessage);
        this.olympics$.next(null);

        return of([]);
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getError(): Observable<string | null> {
    return this.error$.asObservable();
  }
}
