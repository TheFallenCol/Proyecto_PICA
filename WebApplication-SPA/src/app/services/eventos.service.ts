import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService extends DataService {

  constructor(http : HttpClient) { 
    super('https://api.github.com/users/thefallencol/followers', http);
  }
}
