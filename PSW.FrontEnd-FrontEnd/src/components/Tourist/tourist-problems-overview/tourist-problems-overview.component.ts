import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ProblemService } from '../../../services/problem.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../auth/model/user.model';

@Component({
  selector: 'app-tourist-problems-overview',
  templateUrl: './tourist-problems-overview.component.html',
  styleUrls: ['./tourist-problems-overview.component.scss'],
})
export class TouristProblemsOverviewComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;
  problems: any[] = [];

  constructor(
    private authService: AuthService,
    private problemService: ProblemService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    this.loadProblems();

    this.problemService.setAllToSeen(this.userId).subscribe({
      next: () => {
        console.log('Problems set to seen');
      },
      error: (error) => {
        console.error('Error setting problems to seen:', error);
      },
    });
  }

  loadProblems(): void {
    this.problemService.getAllByAuthorId(this.userId).subscribe({
      next: (problems) => {
        this.problems = problems;
      },
      error: (error) => {
        console.error('Error getting problems:', error);
      },
    });
  }
}
