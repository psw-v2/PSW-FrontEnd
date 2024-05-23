import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TourRecommendationService {
  private apiUrl = 'https://localhost:44333/api/tourRecommendations';

  constructor(private http: HttpClient) {}

  createTourRecommendation(tourRecommendation: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, tourRecommendation, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError((error) => {
          throw 'Error in creating tour recommendation: ' + error;
        })
      );
  }

  deleteTourRecommendationByUserIdAndTourId(
    userId: number,
    tourId: number
  ): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/DeleteByUserIdAndTourId/${userId}/${tourId}`)
      .pipe(
        catchError((error) => {
          throw 'Error in deleting tour recommendation: ' + error;
        })
      );
  }

  getAllTourRecommendationsForUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/for-user/${userId}`).pipe(
      catchError((error) => {
        throw 'Error in fetching tour recommendations: ' + error;
      })
    );
  }

  getCountOfTourRecommendationsForUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count-for-user/${userId}`).pipe(
      catchError((error) => {
        throw 'Error in getting count of tour recommendations: ' + error;
      })
    );
  }
}
