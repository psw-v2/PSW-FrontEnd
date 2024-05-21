import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TouristLandingPageComponent } from './tourist-landing-page/tourist-landing-page.component';

@NgModule({
  declarations: [TouristLandingPageComponent],
  imports: [CommonModule, FormsModule],
  exports: [TouristLandingPageComponent],
})
export class TouristModule {}
