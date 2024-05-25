import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ProblemService } from '../../../services/problem.service';
import { User } from '../../../auth/model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-problems-overview',
  templateUrl: './problems-overview.component.html',
  styleUrls: ['./problems-overview.component.scss'],
})
export class ProblemsOverviewComponent implements OnInit {
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

    this.problemService.getAllByTourAuthorIdOnWait(this.userId).subscribe({
      next: (problems) => {
        this.problems = problems;
        console.log(problems);
      },
      error: (error) => {
        console.error('Error getting problems:', error);
      },
    });

    this.problemService.setAllToSeen(this.userId).subscribe({
      next: () => {
        console.log('Problems set to seen');
      },
      error: (error) => {
        console.error('Error setting problems to seen:', error);
      },
    });
  }

  markAsDone(problemId: number) {
    this.problemService.setStatusToResolved(problemId).subscribe({
      next: () => {
        this.snackBar.open('Problem marked as resolved', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
      error: (error) => {
        console.error('Error marking problem as resolved:', error);
      },
    });
  }

  sendToRevision(problemId: number) {
    this.problemService.setStatusToOnRevision(problemId).subscribe({
      next: () => {
        this.snackBar.open('Problem sent to revision', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
      error: (error) => {
        console.error('Error sending problem to revision:', error);
      },
    });
  }
}
