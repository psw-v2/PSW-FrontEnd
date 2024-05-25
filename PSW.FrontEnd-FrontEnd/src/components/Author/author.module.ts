import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorLandingPageComponent } from './author-landing-page/author-landing-page.component';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { FilterPipe } from '../../shared/filter-pipe';
import { TourDetailsComponent } from './tour-details/tour-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AddKeypointComponent } from './add-keypoint/add-keypoint.component';
import { ReportsOverviewComponent } from './reports-overview/reports-overview.component';
import { RecommendedArchiveComponent } from './recommended-archive/recommended-archive.component';

@NgModule({
  declarations: [
    AuthorLandingPageComponent,
    CreateTourComponent,
    FilterPipe,
    TourDetailsComponent,
    AddKeypointComponent,
    ReportsOverviewComponent,
    RecommendedArchiveComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [AuthorLandingPageComponent, CreateTourComponent],
})
export class AuthorModule {}
