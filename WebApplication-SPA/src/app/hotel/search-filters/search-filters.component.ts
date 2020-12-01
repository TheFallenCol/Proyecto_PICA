import { startWith, map } from 'rxjs/operators';
import { Vuelos } from './../../interfaces/Vuelos';
import { ObservableInput } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  @Input('bookingEventCode') bookingEventCode : string;
  @Output('searchFlightsEvent') click = new EventEmitter();
  
  form = new FormGroup({
    originControl : new FormControl(),
    destinationControl : new FormControl(),
    departureDateControl : new FormControl(new Date()),
    arrivalDateControl: new FormControl(new Date()),
    bookFlightControl: new FormControl(),
    quantityPassangers: new FormControl()
  });
  
  cityOptions: string[] = ['Barranquilla[BAQ]', 'Bogota[BOG]', 'Cali[CAL]', 'Pasto[PSO]'];
  filteredOptions: ObservableInput<string[]>;
  originOptions: ObservableInput<string[]>;
  loadingElement:boolean=false;

  flightList: Vuelos[] = [
    {
      Supplier: "Avianca",
      OriginAirport: "BOG",
      DestinationAirport:"GER",
      Origin: "Bogota",
      Destination: "Germania",
      StartDate: new Date('2020-12-01'),
      EndDate: new Date('2020-12-05'),
      Price: 1000000,
      FlightCode: "41asd81asd9"
    },
    {
      Supplier: "Avianca",
      OriginAirport: "BOG",
      DestinationAirport:"GER",
      Origin: "Bogota",
      Destination: "Germania",
      StartDate: new Date('2020-12-01'),
      EndDate: new Date('2020-12-05'),
      Price: 2000000,
      FlightCode: "78981asd9"
    },
    {
      Supplier: "Amadeus",
      OriginAirport: "BOG",
      DestinationAirport:"GER",
      Origin: "Bogota",
      Destination: "Germania",
      StartDate: new Date('2020-12-01'),
      EndDate: new Date('2020-12-05'),
      Price: 3000000,
      FlightCode: "4848151asd9"
    },
    {
      Supplier: "ABC",
      OriginAirport: "BOG",
      DestinationAirport:"GER",
      Origin: "Bogota",
      Destination: "Germania",
      StartDate: new Date('2020-12-01'),
      EndDate: new Date('2020-12-05'),
      Price: 4000000,
      FlightCode: "49891881asd9"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.quantityPassangers.setValue(1);

    this.filteredOptions = this.destinationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.arrivalFilter(value))
      );

    this.originOptions = this.originControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.originFilter(value))
    );
  }

  ngOnChanges(){
    this.bookFlightControl.setValue(this.bookingEventCode);
  }

  private arrivalFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private originFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  searchFlights(){
    this.loadingElement=true;
    setTimeout(() => {
      this.loadingElement=false;
      this.click.emit(<Vuelos[]>this.flightList);
    }, 1000);    
  }

  get tourEventControl(){
    return this.form.get('tourEventControl');
  }

  get destinationControl(){
    return this.form.get('destinationControl');
  }
  
  get originControl(){
    return this.form.get('originControl');
  }

  get departureDateControl(){
    return this.form.get('departureDateControl');
  }

  get arrivalDateControl(){
    return this.form.get('arrivalDateControl');
  }

  get bookFlightControl(){
    return this.form.get('bookFlightControl');
  } 

  get quantityPassangers(){
    return this.form.get('quantityPassangers');
  } 
}
