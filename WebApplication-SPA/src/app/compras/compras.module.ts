import { HotelModule } from './../hotel/hotel.module';
import { VuelosModule } from './../vuelos/vuelos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { ShoppingSummaryComponent } from './shopping-summary/shopping-summary.component';


@NgModule({
  declarations: [
    ShoppingSummaryComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    HotelModule,
    VuelosModule,

  ],
  exports:[
    ShoppingSummaryComponent
  ]
})
export class ComprasModule { }
