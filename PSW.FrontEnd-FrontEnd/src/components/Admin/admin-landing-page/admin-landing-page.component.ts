import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ProblemService } from '../../../services/problem.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-landing-page',
  templateUrl: './admin-landing-page.component.html',
  styleUrls: ['./admin-landing-page.component.scss'],
})
export class AdminLandingPageComponent {
  problems: any[] = [];

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private problemService: ProblemService
  ) {}

  ngOnInit() {
    this.problemService.getAllOnRevision().subscribe({
      next: (problems) => {
        this.problems = problems;
        this.toastr.info(
          `You have ${problems.length} problems on revision`,
          'Problems on revision'
        );
      },
      error: (error) => {
        console.error('Error getting problems:', error);
      },
    });
  }
}
