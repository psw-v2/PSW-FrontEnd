import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user: User | undefined;
  navbarOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

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
