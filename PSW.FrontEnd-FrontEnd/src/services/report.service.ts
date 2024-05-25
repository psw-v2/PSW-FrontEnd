import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'https://localhost:44333/api/reports';

  constructor(private http: HttpClient) {}

  createReport(report: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, report, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError((error) => {
          throw 'Error in posting report data: ' + error;
        })
      );
  }

  getAllReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`).pipe(
      catchError((error) => {
        throw 'Error in fetching all reports: ' + error;
      })
    );
  }

  getReportById(reportId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reportId}`).pipe(
      catchError((error) => {
        throw 'Error in fetching report by ID: ' + error;
      })
    );
  }

  getAllForAuthor(authorId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`https://localhost:44333/getAllForAuthor/${authorId}`)
      .pipe(
        catchError((error) => {
          throw 'Error in fetching all reports for author: ' + error;
        })
      );
  }
}
