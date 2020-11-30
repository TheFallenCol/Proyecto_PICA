import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService extends DataService {

  constructor(http : HttpClient) { 
    super('http://localhost:32790/api/v1/Eventos', http);
  }

  getEventByCity(cityName : string){
    return this.httpClient.get(this.serviceUrl+'/GetEventos', {
      params: {
        ciudad: cityName
      },
      observe: 'response'
    })    
    .pipe(
      map(response => {
      }),
      catchError(this.handleError)
    );
  }

  getCitiesEvents(){    
    return this.httpClient.get(this.serviceUrl+'/GetCiudades')    
    .pipe(
      catchError(this.handleError)
    );
  }
}
