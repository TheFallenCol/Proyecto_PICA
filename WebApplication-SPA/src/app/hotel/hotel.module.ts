import { HotelesService } from './../services/hoteles.service';

import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { CardHotelComponent } from './card-hotel/card-hotel.component';

@NgModule({
  declarations: [
    SearchFiltersComponent,
    CardHotelComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
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
    MatSidenavModule,
    ReactiveFormsModule
  ],
  exports:[
    SearchFiltersComponent,
    CardHotelComponent
  ],
  providers:[
    HotelesService
  ]
})
export class HotelModule { }
