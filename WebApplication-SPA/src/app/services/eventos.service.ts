import { environment } from './../../environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service';
import { Injectable } from '@angular/core';

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
}
