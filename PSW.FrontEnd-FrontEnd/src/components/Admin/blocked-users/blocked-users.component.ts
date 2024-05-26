import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.scss'],
})
export class BlockedUsersComponent implements OnInit {
  users: any[] = [];
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllBlocked().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  unblockUser(userId: number): void {
    this.authService.unblockUser(userId).subscribe({
      next: () => {
        this.snackBar.open('User unblocked successfully', 'Close', {
          duration: 2000,
        });
        this.loadUsers();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
