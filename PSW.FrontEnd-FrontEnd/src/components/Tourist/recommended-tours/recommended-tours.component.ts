import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { TourService } from '../../../services/tour.service';
import { User } from '../../../auth/model/user.model';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoughtTourService } from '../../../services/bought-tour.service';
import { TourRecommendationService } from '../../../services/tour-recommendation.service';
@Component({
  selector: 'app-recommended-tours',
  templateUrl: './recommended-tours.component.html',
  styleUrl: './recommended-tours.component.scss',
})
export class RecommendedToursComponent {
  user: User | undefined;
  userId: number = 0;
  tours: any[] = [];
  filterStatus: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private tourService: TourService,
    private snackBar: MatSnackBar,
    private boughtTourService: BoughtTourService,
    private trService: TourRecommendationService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    // this.boughtTourService
    //   .getAllBoughtToursForUser(this.userId)
    //   .subscribe((tours) => {
    //     this.tours = tours;
    //   });
    this.trService
      .getAllTourRecommendationsForUser(this.userId)
      .subscribe((tours) => {
        this.tours = tours;
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
