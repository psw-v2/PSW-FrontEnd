import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsersElegableForBlock().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  blockUser(userId: number): void {
    this.authService.blockUser(userId).subscribe({
      next: () => {
        this.snackBar.open('User blocked successfully', 'Close', {
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
