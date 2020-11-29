import { Vuelos } from './../../interfaces/Vuelos';
import { AuthService } from './../../auth/auth.service';
import { TourEvent } from './../../interfaces/TourEvent';
import { ObservableInput } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';

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

  consultaFormGroup = new FormGroup({
    citiesEvents: new FormControl('', Validators.required)
  });
  
  transportFormGroup = new FormGroup({
    thirdCtrl: new FormGroup({})
  })

  hotelFormGroup = new FormGroup({
    fourthCtrl: new FormControl('', Validators.required)
  })

  cityOptions: string[] = ['Barranquilla[BAQ]', 'Bogota[BOG]', 'Cali[CAL]', 'Pasto[PSO]'];
  filteredOptions: ObservableInput<string[]>;

  constructor(private authService : AuthService) { 
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

  get thirdCtrl(){
    return this.consultaFormGroup.get('thirdCtrl');
  }

  private cityEventFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  buyEvent(){
    console.log(this.authService.authStatus.value);
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
    this.searchEventCards = true;
  }

  onFlightSelected(flight:Vuelos){
    this.selectedFlight = flight;
    console.log(this.selectedFlight);
  }

  onFlightSearchResponse(flights:Vuelos[]){
    this.foundedFlights = flights;
  }

  onFavoriteSelected(evento:TourEvent){
    this.selectedEvent = evento;
    this.bookingEventCode = evento.tourEventId.toString();
    console.log(this.selectedEvent);
  }
}
