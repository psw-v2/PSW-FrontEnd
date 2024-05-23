import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  userId: number = 0;
  totalPrice: number = 0;

  tours: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private scService: ShoppingCartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.user$.getValue().id;

    this.loadTours();
  }

  loadTours(): void {
    this.scService.getAllForUser(this.userId).subscribe((response) => {
      this.tours = response;
    });
    this.calculateTotal();
  }

  removeTour(tourId: number): void {
    this.scService.deleteItemByUserIdAndTourId(this.userId, tourId).subscribe({
      next: () => {
        this.loadTours();
        this.snackBar.open('Tour removed from cart', 'Close', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  calculateTotal(): void {
    this.scService.getPrice(this.userId).subscribe((response) => {
      this.totalPrice = response;
    });
  }

  checkout(): void {
    this.scService.buyAllItems(this.userId).subscribe({
      next: () => {
        this.router.navigate(['/tourist']);
        this.snackBar.open('Tour(s) purchased successfully', 'Close', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
