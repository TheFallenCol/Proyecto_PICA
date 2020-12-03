import { Vuelos } from './../../interfaces/Vuelos';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {
  @Input('flightsInformation') flightsInformation: Vuelos[];
  @Input('informationCard') informationCard: boolean = false;
  @Output('selected') click = new EventEmitter();
  selectedEvent: Vuelos;

  constructor() { }

  ngOnInit(): void {
  }

  selectedFlight(selectedEvent: Vuelos) {
    this.click.emit(<Vuelos>selectedEvent);
  }
}
