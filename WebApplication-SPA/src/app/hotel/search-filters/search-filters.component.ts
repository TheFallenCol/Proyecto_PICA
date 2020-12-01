import { Hotel } from 'src/app/interfaces/Hotel';
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

  hotelList: Hotel[] = [
    {
      Supplier : 'Hilton',
      Description : '',
      City:'Bogota',
      HotelImage:'Hotel1.jfif',
      EndDate : new Date('2020-12-10'),
      StartDate : new Date('2020-12-05'),
      Price : 200000
    },
    {
      Supplier : 'Dann Carlton',
      Description : '',
      City:'San José del Guaviare',
      HotelImage : 'Hotel2.jfif',
      EndDate : new Date('2020-12-10'),
      StartDate : new Date('2020-12-05'),
      Price : 150000
    }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('Falta cargar ciudades por api')

    this.filteredOptions = this.destinationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.hotelCityFilter(value))
      );
  }

  ngOnChanges(){
    this.bookFlightControl.setValue(this.bookingEventCode);
  }

  private hotelCityFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  searchHotels(){
    this.loadingElement=true;
    setTimeout(() => {
      this.loadingElement=false;
      this.click.emit(<Hotel[]>this.hotelList);
    }, 1000);    
  }

  get destinationControl(){
    return this.form.get('destinationControl');
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
}
