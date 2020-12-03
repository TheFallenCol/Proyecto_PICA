import { Vuelos } from './../interfaces/Vuelos';
import { map, catchError, retry, retryWhen } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { DataService, genericRetryStrategy } from './data-service';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelesService extends DataService {
 
  constructor(http : HttpClient) { 
    super(environment.urlHotelService, http);
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

  getCities(){
    return this.httpClient.get(this.serviceUrl+'/GetCiudades')    
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
}