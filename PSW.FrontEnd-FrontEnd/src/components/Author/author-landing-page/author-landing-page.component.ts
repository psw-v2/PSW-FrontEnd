import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/model/user.model';
import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-author-landing-page',
  templateUrl: './author-landing-page.component.html',
  styleUrls: ['./author-landing-page.component.scss'],
})
export class AuthorLandingPageComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;
  tours: any[] = [];
  filterStatus: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    this.tourService.getAllForAuthor(this.userId).subscribe((tours) => {
      this.tours = tours;
    });
  }
}
