import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TouristLandingPageComponent } from './tourist-landing-page/tourist-landing-page.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { BoughtToursComponent } from './bought-tours/bought-tours.component';
import { RecommendedToursComponent } from './recommended-tours/recommended-tours.component';
import { ChangeInterestComponent } from './change-interest/change-interest.component';
import { AskRecommendedComponent } from './ask-recommended/ask-recommended.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { TouristProblemsOverviewComponent } from './tourist-problems-overview/tourist-problems-overview.component';

@NgModule({
  declarations: [TouristLandingPageComponent, ShoppingCartComponent, BoughtToursComponent, RecommendedToursComponent, ChangeInterestComponent, AskRecommendedComponent, ReportProblemComponent, TouristProblemsOverviewComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [TouristLandingPageComponent],
})
export class TouristModule {}
