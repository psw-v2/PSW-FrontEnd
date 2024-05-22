import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KeyPointService {
  private apiUrl = 'https://localhost:44333/api/keypoints';

  constructor(private http: HttpClient) {}

  createKeyPoint(keyPoint: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, keyPoint, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError((error) => {
          throw 'Error in posting data: ' + error;
        })
      );
  }

  getAllKeyPointsForTour(tourId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllForTour/${tourId}`).pipe(
      catchError((error) => {
        throw 'Error in fetching data: ' + error;
      })
    );
  }
}
