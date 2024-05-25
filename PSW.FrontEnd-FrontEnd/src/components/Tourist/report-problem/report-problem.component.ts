import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../../../services/problem.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/model/user.model';
import { TourService } from '../../../services/tour.service';
import { BoughtTourService } from '../../../services/bought-tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss'],
})
export class ReportProblemComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;
  boughtTours: any[] = [];

  //properties
  problemName: string = '';
  problemDescription: string = '';
  problemStatus: number = 0;
  problemTourId: number = 0;
  problemIsSeen: boolean = false;

  constructor(
    private authService: AuthService,
    private problemService: ProblemService,
    private boughtTourService: BoughtTourService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    this.boughtTourService.getAllBoughtToursForUser(this.userId).subscribe({
      next: (boughtTours) => {
        this.boughtTours = boughtTours;
        console.log('Bought tours fetched successfully');
      },
      error: (error) => {
        console.log('Error in fetching bought tours: ' + error);
      },
    });
  }

  onSubmit(): void {
    const problemData = {
      name: this.problemName,
      description: this.problemDescription,
      status: this.problemStatus,
      tourId: this.problemTourId,
      authorId: this.userId,
      isSeen: this.problemIsSeen,
    };

    this.problemService.createProblem(problemData).subscribe({
      next: () => {
        this.snackBar.open('Problem reported successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/tourist']);
      },
      error: (error) => {
        console.log('Error in posting problem data: ' + error);
      },
    });
  }
}
