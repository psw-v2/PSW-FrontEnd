import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../auth/model/tour.model';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private baseUrl = 'https://localhost:44333/api/tours'; // Adjust as necessary

  constructor(private http: HttpClient) {}

  createTour(tour: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, tour);
  }

  getAllPublished(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllPublished`);
  }

  getAllForAuthor(authorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllForAuthor/${authorId}`);
  }

  archiveTour(tourId: number, tour: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/archive/${tourId}`, tour);
  }

  getById(tourId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tourId}`);
  }
}
