import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/model/user.model';
import { TourService } from '../../../services/tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProblemService } from '../../../services/problem.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author-landing-page',
  templateUrl: './author-landing-page.component.html',
  styleUrls: ['./author-landing-page.component.scss'],
})
export class AuthorLandingPageComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;
  tours: any[] = [];
  filterStatus: string = '';
  count = 0;
  problemsCount = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tourService: TourService,
    private problemService: ProblemService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    this.tourService.getAllForAuthor(this.userId).subscribe((tours) => {
      this.tours = tours;
    });

    this.tourService.getCountRecommendatonsForArchive(this.userId).subscribe({
      next: (count) => {
        this.count = count;
        if (count > 0) {
          this.toastr.info(
            ` You have ${count} tour recommendations for archive`,
            'New Recommendations '
          );
        }
      },
      error: (error) => {
        console.error('Error getting count of tour recommendations:', error);
      },
    });

    this.problemService.getCountForTourAuthor(this.userId).subscribe({
      next: (count) => {
        this.problemsCount = count;
        if (count > 0) {
          this.toastr.info(
            ` You have ${count} problems reported`,
            'New Problems'
          );
        }
      },
      error: (error) => {
        console.error('Error getting count of problems:', error);
      },
    });
  }
}
