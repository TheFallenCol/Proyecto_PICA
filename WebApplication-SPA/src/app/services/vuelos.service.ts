import { environment } from './../../environments/environment';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service';
import { Injectable } from '@angular/core';

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
}
