import { HotelesService } from './../../services/hoteles.service';
import { VuelosService } from './../../services/vuelos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Hotel } from 'src/app/interfaces/Hotel';
import { EventosService } from './../../services/eventos.service';
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
  codigoReservaResponse : number;
  codigoReservaVueloResponse : number;
  codigoReservaHotelResponse : number;
  searchEventCards = false;
  searchEventIsDisabled = true;
  selectedEvent:TourEvent;
  selectedFlight:Vuelos;
  selectedHotel:Hotel;
  bookingEventCode: string;
  foundedFlights: Vuelos[];
  foundedHotels: Hotel[];
  uuidBookingCode: uuidv4;
  loadingElement:boolean = false;
  messageError:string;

  consultaFormGroup = new FormGroup({
    citiesEvents: new FormControl('', Validators.required)
  });
  
  transportFormGroup = new FormGroup({
  })

  hotelFormGroup = new FormGroup({
  })

  shoppingFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    creditCardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
    cvvNumber: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
    loadingMessage: new FormControl()
  });

  cityOptions: string[];
  filteredOptions: ObservableInput<string[]>;

  constructor(private authService : AuthService, private eventosService : EventosService, 
    private vuelosService : VuelosService, private hotelService : HotelesService, public dialog: MatDialog) { 
    this.authService.authStatus.subscribe(authStatus => {
      this.jwtToken = this.authService.getToken();
    });

    this.eventosService.getCitiesEvents().subscribe(response => {
      this.cityOptions = [];      
      response.forEach(element => {
        this.cityOptions.push(element['ciudadUbicacion']);
      });
      this.filteredOptions = this.citiesEvents.valueChanges
      .pipe(
        startWith(''),
        map(value => this.cityEventFilter(value))
      );
    });
  }

  ngOnInit(): void {
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

  get loadingMessage(){
    return this.shoppingFormGroup.get('loadingMessage');
  }  

  private cityEventFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  async buyEvent(){
    if(this.authService.authStatus.value.role === ""){
      this.dialog.open(DialogDataComponent, {
        data: {
          message: 'Para poder realizar la compra debe haber iniciado sesión'
        }
      });
      return;
    }
    else{      
          
      this.loadingElement= true;
      this.loadingMessage.setValue("Realizando reserva de eventos.....");
      await this.delay(3000);  

      this.eventosService.bookingEvent(this.authService.getToken(), this.selectedEvent.tourEventId, this.surname.value,
        this.name.value)
        .subscribe(response => {          
          if(response instanceof HttpErrorResponse){
            if(response.status != 404){
              this.shoppingFormGroup.setErrors({
                comunicationError : true,
                bookingError : true
              });
              this.messageError = "Hubo un error al momento de reservar el evento, comuniquese con el administrador"
            }

            this.shoppingFormGroup.setErrors({
              notFound : true
            });
            return;
          }

          this.codigoReservaResponse = +response["codigoReserva"];          
        });

      if(this.selectedFlight !== undefined){
        this.loadingMessage.setValue("Realizando reserva de vuelos......");
        await this.delay(3000);

        this.vuelosService.bookingFlight(this.authService.getToken(), this.uuidBookingCode, this.selectedFlight.supplier,
        this.selectedFlight.flightCode, this.name.value, this.surname.value, this.selectedFlight.originAirport, 
        this.selectedFlight.destinationAirport, this.selectedFlight.startDate, this.selectedFlight.endDate)
        .subscribe(response => {
          this.loadingElement=false;
          if(response instanceof HttpErrorResponse){
            if(response.status != 404){
              this.shoppingFormGroup.setErrors({
                comunicationError : true,
                bookingError : true
              });
              this.messageError = "Hubo un error al momento de reservar vuelos, comuniquese con el administrador"
            }

            this.shoppingFormGroup.setErrors({
              notFound : true
            });
            return;
          }

          this.codigoReservaVueloResponse = +response["codigoReservaVuelo"];          
        });
      }

      if(this.selectedHotel !== undefined){
        this.loadingMessage.setValue("Realizando reserva de Hoteles......");      
        await this.delay(3000);

        this.hotelService.bookingHotel(this.authService.getToken(), this.uuidBookingCode, this.selectedHotel.supplier,
        this.selectedHotel.hotelCode, this.name.value, this.surname.value)
        .subscribe(response => {
          this.loadingElement=false;
          if(response instanceof HttpErrorResponse){
            if(response.status != 404){
              this.shoppingFormGroup.setErrors({
                comunicationError : true,
                bookingError : true
              });
              this.messageError = "Hubo un error al momento de reservar hoteles, comuniquese con el administrador"
            }

            this.shoppingFormGroup.setErrors({
              notFound : true
            });
            return;
          }

          this.codigoReservaHotelResponse = +response["codigoReservaVuelo"];
        });
      }

      this.loadingMessage.setValue("Iniciando Proceso de pago......");
      await this.delay(3000);
      this.loadingElement = false;
      this.dialog.open(DialogDataComponent, {
        data: {
          message: 'Su compra ha sido realizada exitosamente'
        }
      });
    }
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  onHotelSearchResponse(hotels:Hotel[]){
    this.foundedHotels = hotels;
  }

  onEventSelected(evento:TourEvent){
    this.selectedEvent = evento;
    this.bookingEventCode = evento.tourEventId.toString();
  }

  onHotelSelected(hotelSelected:Hotel){
    this.selectedHotel = hotelSelected;
  } 
}
