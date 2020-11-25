import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VuelosRoutingModule } from './vuelos-routing.module';
import { ConsultaVuelosComponent } from './consulta-vuelos/consulta-vuelos.component';
import { ReservaVuelosComponent } from './reserva-vuelos/reserva-vuelos.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlightCardComponent } from './flight-card/flight-card.component';

@NgModule({
  declarations: [
    ConsultaVuelosComponent,
    ReservaVuelosComponent,
    FlightCardComponent
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    VuelosRoutingModule
  ],
  exports: [
    ConsultaVuelosComponent
  ]
})
export class VuelosModule { }
