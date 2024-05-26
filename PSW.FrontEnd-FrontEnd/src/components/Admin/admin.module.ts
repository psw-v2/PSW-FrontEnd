import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import { AdminManageProblemsComponent } from './admin-manage-problems/admin-manage-problems.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';

@NgModule({
  declarations: [AdminLandingPageComponent, AdminManageProblemsComponent, ManageUsersComponent, BlockedUsersComponent],
  imports: [CommonModule, FormsModule],
  exports: [AdminLandingPageComponent],
})
export class AdminModule {}
