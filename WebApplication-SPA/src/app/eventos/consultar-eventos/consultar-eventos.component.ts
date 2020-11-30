import { DialogDataComponent } from './../../common/dialog-data/dialog-data.component';
import { Vuelos } from './../../interfaces/Vuelos';
import { AuthService } from './../../auth/auth.service';
import { TourEvent } from './../../interfaces/TourEvent';
import { ObservableInput } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consultar-eventos',
  templateUrl: './consultar-eventos.component.html',
  styleUrls: ['./consultar-eventos.component.scss']
})
export class ConsultarEventosComponent implements OnInit {
  private jwtToken;
  isLinear = true;
  searchEventCards = false;
  searchEventIsDisabled = true;
  selectedEvent:TourEvent;
  selectedFlight:Vuelos;
  bookingEventCode: string;
  foundedFlights: Vuelos[];
  uuidBookingCode: uuidv4;

  consultaFormGroup = new FormGroup({
    citiesEvents: new FormControl('', Validators.required)
  });
  
  transportFormGroup = new FormGroup({
  })

  hotelFormGroup = new FormGroup({
    fourthCtrl: new FormControl('', Validators.required)
  })

  shoppingFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    creditCardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
    cvvNumber: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)])
  });

  cityOptions: string[] = ['Barranquilla[BAQ]', 'Bogota[BOG]', 'Cali[CAL]', 'Pasto[PSO]'];
  filteredOptions: ObservableInput<string[]>;

  constructor(private authService : AuthService, public dialog: MatDialog) { 
    this.authService.authStatus.subscribe(authStatus => {
      this.jwtToken = this.authService.getToken();
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.citiesEvents.valueChanges
      .pipe(
        startWith(''),
        map(value => this.cityEventFilter(value))
      );
  }
  
  get citiesEvents(){
    return this.consultaFormGroup.get('citiesEvents');
  }

  get name(){
    return this.shoppingFormGroup.get('name');
  }

  get surname(){
    return this.shoppingFormGroup.get('surname');
  }

  get creditCardNumber(){
    return this.shoppingFormGroup.get('creditCardNumber');
  }  

  get cvvNumber(){
    return this.shoppingFormGroup.get('cvvNumber');
  }

  private cityEventFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  buyEvent(){
    if(this.authService.authStatus.value.role === ""){
      this.dialog.open(DialogDataComponent, {
        data: {
          message: 'Para poder realizar la compra debe estar logeado'
        }
      });
      return;
    }
    else{
      console.log(this.uuidBookingCode);
      console.log(this.selectedEvent);
      console.log(this.selectedFlight);
    }
  }

  changeCity(){
    if(this.citiesEvents.value !== ''){
      this.searchEventIsDisabled = false;
      this.searchEventCards = false;
      return;
    }
    
    this.searchEventIsDisabled = true;    
  }

  searchEvents(){
    this.uuidBookingCode = uuidv4();
    this.searchEventCards = true;

  }

  onFlightSelected(flight:Vuelos){
    this.selectedFlight = flight;
  }

  onFlightSearchResponse(flights:Vuelos[]){
    this.foundedFlights = flights;
  }

  onEventSelected(evento:TourEvent){
    this.selectedEvent = evento;
    this.bookingEventCode = evento.tourEventId.toString();
  }
}
