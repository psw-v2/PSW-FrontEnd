import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leafleat-map/leafleat-map.component';
import { LeafletMapComponent1 } from './leafleat-map-1/leafleat-map-1.component';

@NgModule({
  declarations: [LeafletMapComponent, LeafletMapComponent1],
  imports: [CommonModule],
  exports: [LeafletMapComponent, LeafletMapComponent1],
})
export class SharedModule {}
