import { Hotel } from './../interfaces/Hotel';
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

  insertMessageKafka(uuid : uuidv4, checkInDate : Date, checkOutDate : Date, city : string){
    return this.httpClient.post(this.serviceUrl+'/ConsultarHoteles', {
      "Uuid":uuid,
      "FechaInicio": checkInDate.getFullYear() + '-' + ("0" + checkInDate.getMonth()).slice(-2) +'-' +("0" + checkInDate.getDay()).slice(-2),
      "FechaFinal": checkOutDate.getFullYear() + '-' + ("0" + checkOutDate.getMonth()).slice(-2) +'-' +("0" + checkOutDate.getDay()).slice(-2),
      "CiudadDestino": city
    })
    .pipe(      
      catchError(this.handleError),
      retry(3)
    );
  }

  searchHotels(uuid : uuidv4, checkInDate : Date, checkOutDate : Date, city : string ){
    
    this.insertMessageKafka(uuid, checkInDate, checkOutDate, city)
    .subscribe(response => {
    }, errores => {
      catchError(this.handleError);
    });

    let variable$ = this.httpClient.post<Hotel[]>(this.serviceUrl+'/ConsultarHotelesUiid', {
      "Uuid":uuid,
      "FechaInicio": checkInDate.getFullYear() + '-' + ("0" + checkInDate.getMonth()).slice(-2) +'-' +("0" + checkInDate.getDay()).slice(-2),
      "FechaFinal": checkOutDate.getFullYear() + '-' + ("0" + checkOutDate.getMonth()).slice(-2) +'-' +("0" + checkOutDate.getDay()).slice(-2),
      "CiudadDestino": city
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
