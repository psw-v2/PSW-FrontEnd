import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoughtTourService {
  private apiUrl = 'https://localhost:44333/api/boughtTours';

  constructor(private http: HttpClient) {}

  createBoughtTour(boughtTour: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, boughtTour, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError((error) => {
          throw 'Error in posting bought tour data: ' + error;
        })
      );
  }

  getAllBoughtToursForUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/for-user/${userId}`).pipe(
      catchError((error) => {
        throw 'Error in fetching bought tours for user: ' + error;
      })
    );
  }
}
