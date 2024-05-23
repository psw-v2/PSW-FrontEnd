import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TouristLandingPageComponent } from './tourist-landing-page/tourist-landing-page.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartItemComponent } from './shopping-cart/cart-item/cart-item.component';

@NgModule({
  declarations: [TouristLandingPageComponent, ShoppingCartComponent, CartItemComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [TouristLandingPageComponent],
})
export class TouristModule {}
