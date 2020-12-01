import { Hotel } from 'src/app/interfaces/Hotel';
import { Vuelos } from './../../interfaces/Vuelos';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shopping-summary',
  templateUrl: './shopping-summary.component.html',
  styleUrls: ['./shopping-summary.component.scss']
})
export class ShoppingSummaryComponent implements OnInit, OnChanges{
  @Input('selectedFlight') selectedFlight: Vuelos;
  @Input('selectedHotel') selectedHotel: Hotel;
  arrayFlights: Vuelos[] = new Array<Vuelos>();
  arrayHotels: Hotel[] = new Array<Hotel>();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if(this.selectedFlight !== undefined){
      this.arrayFlights = [];
      this.arrayFlights.push(this.selectedFlight);
    }

    if(this.selectedHotel !== undefined){
      this.arrayHotels = [];
      this.arrayHotels.push(this.selectedHotel);
    }
  }
}
