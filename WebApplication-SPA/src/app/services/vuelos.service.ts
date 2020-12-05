import { Vuelos } from './../interfaces/Vuelos';
import { environment } from './../../environments/environment';
import { map, catchError, retry, retryWhen } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService, genericRetryStrategy } from './data-service';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService extends DataService {

  constructor(http : HttpClient) { 
    super(environment.urlVuelosService, http);
  }

  getEventByCity(cityName : string){
    return this.httpClient.get(this.serviceUrl+'/GetEventos', {
      params: {
        ciudad: cityName
      },
      observe: 'response'
    })    
    .pipe(
      map(response => response.body),
      catchError(this.handleError),
      retry(3)
    );
  }

  getAirports(){    
    return this.httpClient.get(this.serviceUrl+'/GetAeropuertos')    
    .pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  insertMessageKafka(uuid: uuidv4, startDate: Date, endDate: Date, origin: string, destination: string){
    return this.httpClient.post(this.serviceUrl+'/ConsultarVuelos', {
      "Uuid":uuid,
      "FechaInicio": startDate.getFullYear() + '-' + ("0" + startDate.getMonth()).slice(-2) +'-' +("0" + startDate.getDay()).slice(-2),
      "FechaFinal": endDate.getFullYear() + '-' + ("0" + endDate.getMonth()).slice(-2) +'-' +("0" + endDate.getDay()).slice(-2),
      "Origen": origin,
      "Destino": destination,
      "CantidadPasajeros": 1
    })
    .pipe(      
      catchError(this.handleError),
      retry(3)
    );
  }

  searchFlights(uuid: uuidv4, startDate: Date, endDate: Date, origin: string, destination: string ){
    
    this.insertMessageKafka(uuid, startDate, endDate, origin, destination)
    .subscribe(response => {
          
    }, errores => {
      catchError(this.handleError);
    });

    let variable$ = this.httpClient.get<Vuelos[]>(this.serviceUrl+'/ConsultarVuelosUiid', {
      params: {
        uuid: uuid
      },
      observe: 'response'
    });

    return variable$
    .pipe(
      retryWhen(genericRetryStrategy({
        maxRetryAttempts : 3,
        scalingDuration : 3000
      })),
      catchError(error => of(error))
    );
  }

  bookingFlight(token: string, uuid:uuidv4, supplierName: string, flightCode:string, name: string, surname:string, 
    originIATA: string, destinationIATA:string, departureDate : Date, arrivalDate : Date){
    let bearerHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  
    this.insertBookingMessageKafka(token, uuid, supplierName, flightCode, name+surname, originIATA, 
      destinationIATA, departureDate, arrivalDate)
    .subscribe(response => {          
    }, errores => {
      catchError(this.handleError);
    });

    let variable$ = this.httpClient.get<Vuelos[]>(this.serviceUrl+'/ConsultarReservaUiid', {
      params: {
        uuid: uuid,
        apellido: surname,
        nombre : name
      },
      observe: 'response',
      headers : bearerHeaders
    });

    return variable$
    .pipe(
      retryWhen(genericRetryStrategy({
        maxRetryAttempts : 3,
        scalingDuration : 3000
      })),
      catchError(error => of(error))
    );
  }
  
  insertBookingMessageKafka(token: string, uuid:uuidv4, supplierName: string, flightCode:string, fullName:string, 
    originIATA: string, destinationIATA:string, departureDate : Date, arrivalDate : Date){
    let bearerHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    let starDate = new Date(departureDate)
    let endDate = new Date(arrivalDate);

    return this.httpClient.post(this.serviceUrl+'/ReservarVuelo', {
      "Uuid":uuid,
      "NombreProveedor":supplierName,
      "CodigoVuelo":flightCode,
      "Nombres":fullName,
      "IataOrigen":originIATA,
      "IataDestino":destinationIATA,
      "StartDate": starDate.getFullYear() + '-' + ("0" + starDate.getMonth()).slice(-2) +'-' +("0" + starDate.getDay()).slice(-2),
      "EndDate": endDate.getFullYear() + '-' + ("0" + endDate.getMonth()).slice(-2) +'-' +("0" + endDate.getDay()).slice(-2)
    }, { headers: bearerHeaders})
    .pipe(      
      catchError(this.handleError),
      retry(3)
    );
  }
}