import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorLandingPageComponent } from './author-landing-page/author-landing-page.component';

@NgModule({
  declarations: [AuthorLandingPageComponent],
  imports: [CommonModule, FormsModule],
  exports: [AuthorLandingPageComponent],
})
export class AuthorModule {}
