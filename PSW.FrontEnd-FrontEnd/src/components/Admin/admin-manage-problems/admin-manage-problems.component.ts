import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ProblemService } from '../../../services/problem.service';
import { User } from '../../../auth/model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-manage-problems',
  templateUrl: './admin-manage-problems.component.html',
  styleUrl: './admin-manage-problems.component.scss',
})
export class AdminManageProblemsComponent implements OnInit {
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
  }

  loadProblems(): void {
    this.problemService.getAllOnRevision().subscribe({
      next: (problems) => {
        this.problems = problems;
        console.log(problems);
      },
      error: (error) => {
        console.error('Error getting problems:', error);
      },
    });
  }

  declineProblem(problemId: number) {
    this.problemService.setStatusToDiscarded(problemId).subscribe({
      next: () => {
        this.snackBar.open('Problem declined', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        this.loadProblems();
      },
      error: (error) => {
        console.error('Error declining problem:', error);
      },
    });
  }

  setOnWait(problemId: number) {
    this.problemService.setStatusToOnWait(problemId).subscribe({
      next: () => {
        this.snackBar.open('Problem set to on wait', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        this.loadProblems();
      },
      error: (error) => {
        console.error('Error setting problem to on wait:', error);
      },
    });
  }
}
