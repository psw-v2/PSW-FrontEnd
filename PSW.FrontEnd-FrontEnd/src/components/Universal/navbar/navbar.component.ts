import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/model/user.model';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('dropdown', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('200ms ease-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  user: User | undefined;
  navbarOpen = false;
  closeTimer: any;

  dropdowns: { [key: string]: boolean } = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  openDropdown(dropdownId: string): void {
    this.dropdowns[dropdownId] = true;
    this.cancelTimer();
  }

  private cancelTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  startChecking(dropdownId: string): void {
    this.cancelTimer(); // Make sure to cancel existing timer if moving within dropdowns
    this.closeTimer = setTimeout(() => {
      this.closeDropdown(dropdownId);
    }, 0); // Delay before closing dropdown
  }

  closeDropdown(dropdownId: string): void {
    this.dropdowns[dropdownId] = false;
  }

  stopChecking(): void {
    this.cancelTimer(); // Cancel any running timer when mouse enters any dropdown
  }

  //-----------------------------------------------------------------------------------

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.logout();
  }

  getRouteBasedOnRole() {
    if (this.user) {
      switch (this.user.role) {
        case 'tourist':
          return '/tourist';
        case 'author':
          return '/author';
        case 'admin':
          return '/admin';
        default:
          return '/';
      }
    } else {
      return '/';
    }
  }
}
