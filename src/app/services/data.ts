import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PortfolioData } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private portfolioDataSubject = new BehaviorSubject<PortfolioData | null>(null);
  public portfolioData$ = this.portfolioDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPortfolioData();
  }

  private loadPortfolioData(): void {
    this.http.get<PortfolioData>('assets/data/portfolio-data.json')
      .pipe(
        tap(data => this.portfolioDataSubject.next(data))
      )
      .subscribe({
        error: err => console.error('Error loading portfolio data:', err)
      });
  }

  getPortfolioData(): Observable<PortfolioData | null> {
    return this.portfolioData$;
  }
}
