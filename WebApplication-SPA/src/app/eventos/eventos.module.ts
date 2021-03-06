import { HotelModule } from './../hotel/hotel.module';
import { EventosService } from './../services/eventos.service';
import { ComprasModule } from './../compras/compras.module';
import { AuthService } from './../auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { ConsultarEventosComponent } from './consultar-eventos/consultar-eventos.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule} from '@angular/material/divider';
import { CardEventComponent } from './card-event/card-event.component';
import { VuelosModule } from '../vuelos/vuelos.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InformationCardComponentComponent } from './information-card-component/information-card-component.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ConsultarEventosComponent,
    CardEventComponent,
    InformationCardComponentComponent
  ],
  imports: [
    HotelModule,
    VuelosModule,
    ComprasModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    EventosRoutingModule,
    MatStepperModule
  ],
  providers:[
    AuthService,
    EventosService
  ],
  exports:[
  ]
})
export class EventosModule { }
