import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { TourService } from '../../../services/tour.service';
import { User } from '../../../auth/model/user.model';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TourRecommendationService } from '../../../services/tour-recommendation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tourist-landing-page',
  templateUrl: './tourist-landing-page.component.html',
  styleUrl: './tourist-landing-page.component.scss',
})
export class TouristLandingPageComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;
  tours: any[] = [];
  filterStatus: string = '';
  count = 0;
  isAwarded = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private rtService: TourRecommendationService,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private tourService: TourService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    this.tourService.getForUserPurchase(this.userId).subscribe((tours) => {
      this.tours = tours;
    });

    this.rtService.getCountOfTourRecommendationsForUser(this.userId).subscribe({
      next: (count) => {
        this.count = count;
        if (count > 0) {
          this.toastr.info(
            `You have ${count} tour recommendations`,
            'New Recommendations'
          );
          // this.snackBar.open(
          //   ` You have ${count} tour recommendations`,
          //   'Close',
          //   {
          //     duration: 2000,
          //     verticalPosition: 'top',
          //     horizontalPosition: 'right',
          //   }
          // );
        }
      },
      error: (error) => {
        console.error('Error getting count of tour recommendations:', error);
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

  toggleSlider() {
    this.isAwarded = !this.isAwarded;

    //FALSE = ALL , TRUE = AWARDED
    console.log(this.tours);
    if (this.isAwarded == true) {
      this.tours.forEach((tour) => {
        if (this.authService.isAuthorAwarded(tour.authorId)) {
          this.tours = this.tours.filter((tour) => tour.authorId !== 1);
        }
      });
    } else {
      this.tourService.getForUserPurchase(this.userId).subscribe((tours) => {
        this.tours = tours;
      });
    }
  }
}
