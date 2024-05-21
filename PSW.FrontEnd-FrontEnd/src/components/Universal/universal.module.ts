import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [HomePageComponent, ErrorComponent],
  imports: [CommonModule, FormsModule],
  exports: [HomePageComponent],
})
export class UniversalModule {}
