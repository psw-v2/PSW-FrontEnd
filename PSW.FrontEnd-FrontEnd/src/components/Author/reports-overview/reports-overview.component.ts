import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/model/user.model';

@Component({
  selector: 'app-reports-overview',
  templateUrl: './reports-overview.component.html',
  styleUrls: ['./reports-overview.component.scss'],
})
export class ReportsOverviewComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;
  reports: any[] = [];

  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userId = this.authService.user$.getValue().id;

    this.reportService.getAllForAuthor(this.userId).subscribe({
      next: (reports) => {
        this.reports = reports;
        console.log('Reports:', reports);
      },
      error: (error) => {
        console.error('Error retrieving reports:', error);
      },
    });
  }
}
