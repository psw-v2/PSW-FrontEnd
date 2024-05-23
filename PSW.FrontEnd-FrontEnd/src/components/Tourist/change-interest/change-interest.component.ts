import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-interest',
  templateUrl: './change-interest.component.html',
  styleUrls: ['./change-interest.component.scss'],
})
export class ChangeInterestComponent implements OnInit {
  userrr: any | undefined;
  userId: number = 0;
  userInterest: any | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.authService.user$.subscribe((user) => {
    //   this.user = user;
    // });
    this.userId = this.authService.user$.getValue().id;

    this.authService.getUserById(this.userId).subscribe((user) => {
      this.userrr = user;
      console.log(this.userrr);
      this.userInterest = this.userrr.interest;
    });
    console.log(this.userInterest);
  }

  changeInterest(): void {
    this.authService.changeInterest(this.userId, this.userInterest).subscribe({
      next: () => {
        this.router.navigate(['/tourist']);
        this.snackBar.open('Interest changed successfully', 'Close', {
          duration: 2000,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
