import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { TourService } from '../../../services/tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss'],
})
export class CreateTourComponent implements OnInit {
  //properties
  tourName: string = '';
  tourDifficulty: number = 0;
  tourInterest: number = 0;
  tourPrice: number = 0;
  tourStatus: number = 0;
  authorId: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tourService: TourService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authorId = this.authService.user$.getValue().id;
  }

  onSubmit(): void {
    const tourData = {
      name: this.tourName,
      difficulty: Number(this.tourDifficulty),
      interest: Number(this.tourInterest),
      price: this.tourPrice,
      status: this.tourStatus,
      authorId: this.authorId,
    };

    this.tourService.createTour(tourData).subscribe((response) => {
      console.log(response);
      this.snackBar.open('Tour created successfully', 'Close', {
        duration: 2000,
      });
      this.router.navigate(['/author']);
    });
  }
}
