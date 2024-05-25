import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import { AdminManageProblemsComponent } from './admin-manage-problems/admin-manage-problems.component';

@NgModule({
  declarations: [AdminLandingPageComponent, AdminManageProblemsComponent],
  imports: [CommonModule, FormsModule],
  exports: [AdminLandingPageComponent],
})
export class AdminModule {}
