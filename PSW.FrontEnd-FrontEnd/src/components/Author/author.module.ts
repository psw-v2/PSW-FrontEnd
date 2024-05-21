import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorLandingPageComponent } from './author-landing-page/author-landing-page.component';
import { CreateTourComponent } from './create-tour/create-tour.component';

@NgModule({
  declarations: [AuthorLandingPageComponent, CreateTourComponent],
  imports: [CommonModule, FormsModule],
  exports: [AuthorLandingPageComponent, CreateTourComponent],
})
export class AuthorModule {}
