import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private apiUrl = 'https://localhost:44333/api/shoppingCarts';

  constructor(private http: HttpClient) {}

  createShoppingCart(shoppingCart: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, shoppingCart, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError((error) => {
          throw 'Error in creating shopping cart: ' + error;
        })
      );
  }

  deleteItemByUserIdAndTourId(userId: number, tourId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/DeleteByUserIdAndTourId/${userId}/${tourId}`)
      .pipe(
        catchError((error) => {
          throw 'Error in deleting item: ' + error;
        })
      );
  }

  getAllForUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/for-user/${userId}`).pipe(
      catchError((error) => {
        throw 'Error in fetching data: ' + error;
      })
    );
  }

  getPrice(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/calculate-price/${userId}`).pipe(
      catchError((error) => {
        throw 'Error in calculating price: ' + error;
      })
    );
  }

  buyAllItems(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/BuyAll/${userId}`).pipe(
      catchError((error) => {
        throw 'Error in purchasing items: ' + error;
      })
    );
  }
}
