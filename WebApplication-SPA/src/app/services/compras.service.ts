import { catchError, retry } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { DataService } from './data-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ComprasService extends DataService {

  constructor(http : HttpClient) { 
    super(environment.urlComprasService, http);
  }

  payBooking(uuid: uuidv4, bookinHotelId: string, bookinFlightId: string, bookingBusId: string, 
    bookingEventId: string, totalPayment:number){
    return this.httpClient.post(this.serviceUrl+'/pagar', {
      "pagoid":uuid,
      "resHotelId": bookinHotelId,
      "resVueloId": bookinFlightId,
      "resBusId": bookingBusId,
      "resEventoId": bookingEventId,
      "valorTotal": totalPayment
    })
    .pipe(      
      catchError(this.handleError),
      retry(3)
    );
  }

  getStatus(uuid: uuidv4){
    return this.httpClient.get(this.serviceUrl+'/get', {
      params: {
        id: uuid
      },
      observe: 'response'
    })
    .pipe(      
      catchError(this.handleError),
      retry(3)
    );
  }
}
