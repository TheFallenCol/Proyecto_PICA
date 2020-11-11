import { ReservaVuelosComponent } from './reserva-vuelos/reserva-vuelos.component';
import { ConsultaVuelosComponent } from './consulta-vuelos/consulta-vuelos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'vuelos/consulta', component:ConsultaVuelosComponent },
  { path:'vuelos/reserva', component:ReservaVuelosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VuelosRoutingModule { }
