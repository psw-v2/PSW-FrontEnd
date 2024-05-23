import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { TourService } from '../../../services/tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-ask-recommended',
  templateUrl: './ask-recommended.component.html',
  styleUrls: ['./ask-recommended.component.scss'],
})
export class AskRecommendedComponent implements OnInit {
  userrr: any | undefined;
  userId: number = 0;
  tourDifficulty: any | undefined;
  tours: any[] = [];

  constructor(
    private authService: AuthService,
    private tourService: TourService,
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.user$.getValue().id;
  }

  onSubmit() {
    if (this.tourDifficulty === undefined) {
      this.snackBar.open('Please select a difficulty level', 'Close', {
        duration: 2000,
      });
      return;
    }

    this.tourService
      .getRecommendations(this.userId, this.tourDifficulty)
      .subscribe({
        next: (data) => {
          this.tours = data;
          if (this.tours.length === 0) {
            this.snackBar.open('No tours found', 'Close', {
              duration: 2000,
            });
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  addToCart(tourId: number): void {
    const data = {
      buyerId: this.userId,
      tourId: tourId,
    };

    this.shoppingCartService.createShoppingCart(data).subscribe(
      () => {
        this.tourService.getForUserPurchase(this.userId).subscribe((tours) => {
          this.tours = tours;
        });

        this.snackBar.open('Tour added to cart', 'Close', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error adding tour to cart:', error);
      }
    );
  }
}
