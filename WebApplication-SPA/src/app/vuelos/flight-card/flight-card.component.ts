import { FormGroup } from '@angular/forms';
import { Vuelos } from './../../interfaces/Vuelos';
import { TourEvent } from './../../interfaces/TourEvent';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {
  @Input('flightsInformation') flightsInformation: Vuelos[];
  @Output('selected') click = new EventEmitter();
  srcImage = '../../../assets/images/Equipos/';
  selectedEvent: Vuelos;

  constructor() { }

  ngOnInit(): void {
    console.log(this.flightsInformation);
  }

  selectedFlight(selectedEvent: Vuelos) {
    this.click.emit(<Vuelos>selectedEvent);
  }
}
