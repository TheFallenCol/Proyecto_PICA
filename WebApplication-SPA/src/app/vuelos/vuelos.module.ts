import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VuelosRoutingModule } from './vuelos-routing.module';
import { ConsultaVuelosComponent } from './consulta-vuelos/consulta-vuelos.component';
import { ReservaVuelosComponent } from './reserva-vuelos/reserva-vuelos.component';


@NgModule({
  declarations: [
    ConsultaVuelosComponent,
    ReservaVuelosComponent
  ],
  imports: [
    CommonModule,
    VuelosRoutingModule
  ]
})
export class VuelosModule { }
