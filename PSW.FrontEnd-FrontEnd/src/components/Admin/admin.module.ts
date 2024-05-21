import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';

@NgModule({
  declarations: [AdminLandingPageComponent],
  imports: [CommonModule, FormsModule],
  exports: [AdminLandingPageComponent],
})
export class AdminModule {}
