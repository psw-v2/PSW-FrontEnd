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

  archiveTour(tourId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/archive/${tourId}`, {});
  }

  publishTour(tourId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/publish/${tourId}`, {});
  }

  getById(tourId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tourId}`);
  }

  getForUserPurchase(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetForUserPurchase/${userId}`);
  }

  getRecommendations(userId: number, difficulty: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/GetRecommendations/${userId}/${difficulty}`
    );
  }

  getRecommendatonsForArchive(userId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/getRecommendatonsForArchive/${userId}`
    );
  }

  getCountRecommendatonsForArchive(userId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/getCountRecommendatonsForArchive/${userId}`
    );
  }
}
