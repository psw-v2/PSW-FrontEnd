import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProblemService {
  private apiUrl = 'https://localhost:44333/api/problems';

  constructor(private http: HttpClient) {}

  createProblem(problem: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, problem, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError((error) => {
          throw 'Error in posting problem data: ' + error;
        })
      );
  }

  getAllByTourAuthorIdOnWait(tourAuthorId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/GetAllByTourAuthorIdOnWait/${tourAuthorId}`)
      .pipe(
        catchError((error) => {
          throw 'Error in fetching problems: ' + error;
        })
      );
  }

  setStatusToResolved(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/SetStatusToResolved/${id}`, {}).pipe(
      catchError((error) => {
        throw 'Error in setting status to resolved: ' + error;
      })
    );
  }

  // Implement additional methods for other status updates and queries
  setStatusToOnRevision(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/SetStatusToOnRevision/${id}`, {}).pipe(
      catchError((error) => {
        throw 'Error in setting status to on revision: ' + error;
      })
    );
  }

  setStatusToOnWait(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/SetStatusToOnWait/${id}`, {}).pipe(
      catchError((error) => {
        throw 'Error in setting status to on wait: ' + error;
      })
    );
  }

  setStatusToDiscarded(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/SetStatusToDiscarded/${id}`, {}).pipe(
      catchError((error) => {
        throw 'Error in setting status to discarded: ' + error;
      })
    );
  }

  getAllOnRevision(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllOnRevision`).pipe(
      catchError((error) => {
        throw 'Error in fetching all problems on revision: ' + error;
      })
    );
  }

  getAllByAuthorId(authorId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/GetAllByAuthorId/${authorId}`)
      .pipe(
        catchError((error) => {
          throw 'Error in fetching problems by author ID: ' + error;
        })
      );
  }

  getAllByTourAuthorId(tourAuthorId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/GetAllByTourAuthorId/${tourAuthorId}`
    );
  }

  getCountForTourAuthor(tourAuthorId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/count-for-tourAuthor/${tourAuthorId}`
    );
  }

  setAllToSeen(tourAuthorId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/SetAllToSeen/${tourAuthorId}`, {});
  }
}
