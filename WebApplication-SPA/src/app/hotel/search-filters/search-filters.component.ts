import { Hotel } from 'src/app/interfaces/Hotel';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelesService } from './../../services/hoteles.service';
import { CitiesAerports } from './../../vuelos/consulta-vuelos/consulta-vuelos.component';
import { startWith, map } from 'rxjs/operators';
import { ObservableInput } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  @Input('bookingEventCode') bookingEventCode : string;
  @Input('uuid') uuidBookingCode : uuidv4;
  @Output('searchFlightsEvent') click = new EventEmitter();
  
  form = new FormGroup({
    destinationControl : new FormControl(),
    checkOutControl : new FormControl(new Date()),
    checkInControl: new FormControl(new Date()),
    bookFlightControl: new FormControl(),
    quantityPassangers: new FormControl()
  });

  citiesAirports : CitiesAerports[];
  cityOptions: string[];
  filteredOptions: ObservableInput<string[]>;
  originOptions: ObservableInput<string[]>;
  loadingElement:boolean=false;
  
  constructor(private hotelesService : HotelesService) { }

  ngOnInit(): void {
    console.log('Falta cargar ciudades por api')

    this.hotelesService.getCities().subscribe(response => {
      this.citiesAirports = response as CitiesAerports[];
      this.cityOptions = [];

      response.forEach(element => {        
        this.cityOptions.push(element['ciudadUbicacion']);
      });
      
      this.filteredOptions = this.destinationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.hotelCityFilter(value))
      );
    })    
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
    this.hotelesService.searchHotels(this.uuidBookingCode, this.checkInControl.value, this.checkOutControl.value, 
      this.destinationControl.value)
      .subscribe(response => {
        this.loadingElement=false;
        if(response instanceof HttpErrorResponse){
          if(response.status != 404){
            this.form.setErrors({
              comunicationError : true
            });
          }          
          
          this.form.setErrors({
            notFound : true
          });
          return;
        }
        
        response.forEach(element => {
           element['hotelImage'] = element['hotelImage'] + '.png'
        });

        this.click.emit(<Hotel[]>response as Array<Hotel>);
      });
  }

  get destinationControl(){
    return this.form.get('destinationControl');
  }

  get checkOutControl(){
    return this.form.get('checkOutControl');
  }

  get checkInControl(){
    return this.form.get('checkInControl');
  }

  get bookFlightControl(){
    return this.form.get('bookFlightControl');
  } 
}
