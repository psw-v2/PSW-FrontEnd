import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../components/Universal/home-page/home-page.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { TouristLandingPageComponent } from '../components/Tourist/tourist-landing-page/tourist-landing-page.component';
import { AdminLandingPageComponent } from '../components/Admin/admin-landing-page/admin-landing-page.component';
import { AuthorLandingPageComponent } from '../components/Author/author-landing-page/author-landing-page.component';
import { AdminGuard } from '../auth/admin.guard';
import { AuthorGuard } from '../auth/author.guard';
import { TouristGuard } from '../auth/tourist.guard';
import { ErrorComponent } from '../components/Universal/error/error.component';
import { CreateTourComponent } from '../components/Author/create-tour/create-tour.component';
import { TourDetailsComponent } from '../components/Author/tour-details/tour-details.component';
import { AddKeypointComponent } from '../components/Author/add-keypoint/add-keypoint.component';
import { AuthorTouristGuard } from '../auth/authortourist.guard';
import { ShoppingCartComponent } from '../components/Tourist/shopping-cart/shopping-cart.component';
import { BoughtToursComponent } from '../components/Tourist/bought-tours/bought-tours.component';
import { RecommendedToursComponent } from '../components/Tourist/recommended-tours/recommended-tours.component';
import { ChangeInterestComponent } from '../components/Tourist/change-interest/change-interest.component';
import { AskRecommendedComponent } from '../components/Tourist/ask-recommended/ask-recommended.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: ErrorComponent },

  //ADMIN
  {
    path: 'admin',
    component: AdminLandingPageComponent,
    canActivate: [AdminGuard],
  },
  //AUTHOR
  {
    path: 'author',
    component: AuthorLandingPageComponent,
    canActivate: [AuthorGuard],
  },
  {
    path: 'create-tour',
    component: CreateTourComponent,
    canActivate: [AuthorGuard],
  },
  {
    path: 'tour-details/:tourId',
    component: TourDetailsComponent,
    canActivate: [AuthorTouristGuard],
  },
  {
    path: 'add-keypoint/:tourId',
    component: AddKeypointComponent,
    canActivate: [AuthorGuard],
  },
  //TOURIST
  {
    path: 'tourist',
    component: TouristLandingPageComponent,
    canActivate: [TouristGuard],
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [TouristGuard],
  },
  {
    path: 'bought-tours',
    component: BoughtToursComponent,
    canActivate: [TouristGuard],
  },
  {
    path: 'recommended-tours',
    component: RecommendedToursComponent,
    canActivate: [TouristGuard],
  },
  {
    path: 'change-interest',
    component: ChangeInterestComponent,
    canActivate: [TouristGuard],
  },
  {
    path: 'ask-recommended',
    component: AskRecommendedComponent,
    canActivate: [TouristGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
