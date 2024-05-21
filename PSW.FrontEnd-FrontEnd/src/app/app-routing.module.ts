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

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

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
  //TOURIST
  {
    path: 'tourist',
    component: TouristLandingPageComponent,
    canActivate: [TouristGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
