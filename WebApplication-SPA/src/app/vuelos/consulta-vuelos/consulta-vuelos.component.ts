import { VuelosService } from './../../services/vuelos.service';
import { Vuelos } from './../../interfaces/Vuelos';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { ObservableInput } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-consulta-vuelos',
  templateUrl: './consulta-vuelos.component.html',
  styleUrls: ['./consulta-vuelos.component.scss']
})

export class ConsultaVuelosComponent implements OnInit, OnChanges {
  @Input('bookingEventCode') bookingEventCode : string;
  @Input('uuid') uuidBookingCode : uuidv4;
  @Output('searchFlightsEvent') click = new EventEmitter();
  
  form = new FormGroup({    
    originControl : new FormControl(),
    destinationControl : new FormControl(),
    departureDateControl : new FormControl(new Date()),
    arrivalDateControl: new FormControl(new Date()),
    bookFlightControl: new FormControl(),
    quantityPassangers: new FormControl()
  });
  
  citiesAirports : CitiesAerports[];
  cityOptions: string[];
  filteredOptions: ObservableInput<string[]>;
  originOptions: ObservableInput<string[]>;
  loadingElement:boolean=false;

  constructor(private vuelosService : VuelosService) { }

  ngOnInit(): void {
    this.quantityPassangers.setValue(1);

    this.vuelosService.getAirports().subscribe(response => {
      this.citiesAirports = response as CitiesAerports[];
      this.cityOptions = [];

      response.forEach(element => {        
        this.cityOptions.push(element['ciudadUbicacion']);
      });
      
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
    })
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
    this.vuelosService.searchFlights(this.uuidBookingCode, this.departureDateControl.value, this.arrivalDateControl.value, 
      this.originControl.value, this.destinationControl.value)
      .subscribe(response => {
        this.loadingElement=false;
        if(response instanceof HttpErrorResponse){
          this.form.setErrors({
            comunicationError : true
          })
          return;
        }
        this.click.emit(<Vuelos[]>response.body as Array<Vuelos>);
      });
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

interface CitiesAerports {
  id: number,
  iata: string,
  ciudadUbicacion: string,
  concatenado: string
}