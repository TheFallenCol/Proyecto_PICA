import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VuelosRoutingModule } from './vuelos-routing.module';
import { ConsultaVuelosComponent } from './consulta-vuelos/consulta-vuelos.component';
import { ReservaVuelosComponent } from './reserva-vuelos/reserva-vuelos.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule} from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ConsultaVuelosComponent,
    ReservaVuelosComponent,
    FlightCardComponent
  ],
  imports: [
    MatIconModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    VuelosRoutingModule
  ],
  exports: [
    ConsultaVuelosComponent,
    FlightCardComponent
  ]
})
export class VuelosModule { }
