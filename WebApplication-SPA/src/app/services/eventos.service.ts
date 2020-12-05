import { environment } from './../../environments/environment';
import { catchError, map, retry, retryWhen } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService, genericRetryStrategy } from './data-service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService extends DataService {

  constructor(http : HttpClient) { 
    super(environment.urlEventService, http);
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

  getCitiesEvents(){    
    return this.httpClient.get(this.serviceUrl+'/GetCiudades')    
    .pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  bookingEvent(token:string, eventoId: number, surname : string, name : string){
    let bearerHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    let variable$ = this.httpClient.post(this.serviceUrl+'/ReservarEvento', {
      "EventoId": eventoId,
      "Apellido": surname,
      "Nombre": name
    }, {
      headers:bearerHeaders
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
