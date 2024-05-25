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
  selector: 'app-recommended-archive',
  templateUrl: './recommended-archive.component.html',
  styleUrl: './recommended-archive.component.scss',
})
export class RecommendedArchiveComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;
  tours: any[] = [];
  filterStatus: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private tourService: TourService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    this.tourService
      .getRecommendatonsForArchive(this.userId)
      .subscribe((tours) => {
        this.tours = tours;
      });
  }

  archiveTour(tourId: number): void {
    this.tourService.archiveTour(tourId).subscribe({
      next: (response) => {
        this.snackBar.open('Tour archived successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/author']);
      },
      error: (error) => {
        console.log('Error in publishing tour: ' + error);
      },
    });
  }
}
