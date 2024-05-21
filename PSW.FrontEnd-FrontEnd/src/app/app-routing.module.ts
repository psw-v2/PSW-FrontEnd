import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../components/Universal/home-page/home-page.component';
import { LoginComponent } from '../components/Universal/login/login.component';
import { RegisterComponent } from '../components/Universal/register/register.component';
import { TouristLandingPageComponent } from '../components/Tourist/tourist-landing-page/tourist-landing-page.component';
import { AdminLandingPageComponent } from '../components/Admin/admin-landing-page/admin-landing-page.component';
import { AuthorLandingPageComponent } from '../components/Author/author-landing-page/author-landing-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //ADMIN
  { path: 'admin', component: AdminLandingPageComponent },
  //AUTHOR
  { path: 'author', component: AuthorLandingPageComponent },
  //TOURIST
  { path: 'tourist', component: TouristLandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
