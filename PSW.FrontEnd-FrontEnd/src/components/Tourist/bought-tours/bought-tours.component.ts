import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { TourService } from '../../../services/tour.service';
import { User } from '../../../auth/model/user.model';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoughtTourService } from '../../../services/bought-tour.service';

@Component({
  selector: 'app-bought-tours',
  templateUrl: './bought-tours.component.html',
  styleUrl: './bought-tours.component.scss',
})
export class BoughtToursComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;
  tours: any[] = [];
  filterStatus: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private tourService: TourService,
    private snackBar: MatSnackBar,
    private boughtTourService: BoughtTourService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    // this.tourService.getForUserPurchase(this.userId).subscribe((tours) => {
    //   this.tours = tours;
    // });
    this.boughtTourService
      .getAllBoughtToursForUser(this.userId)
      .subscribe((tours) => {
        this.tours = tours;
      });
  }
}
