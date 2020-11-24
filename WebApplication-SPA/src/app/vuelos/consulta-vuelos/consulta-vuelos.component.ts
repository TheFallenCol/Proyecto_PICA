import { TourEvent } from './../../interfaces/TourEvent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ObservableInput } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-consulta-vuelos',
  templateUrl: './consulta-vuelos.component.html',
  styleUrls: ['./consulta-vuelos.component.scss']
})

export class ConsultaVuelosComponent implements OnInit {
  form = new FormGroup({    
    originControl : new FormControl(),
    destinationControl : new FormControl(),
    departureDateControl : new FormControl(new Date()),
    arrivalDateControl: new FormControl(new Date()),
    bookFlightControl: new FormControl()
  });
  
  cityOptions: string[] = ['Barranquilla[BAQ]', 'Bogota[BOG]', 'Cali[CAL]', 'Pasto[PSO]'];
  filteredOptions: ObservableInput<string[]>;
  originOptions: ObservableInput<string[]>;

  tourEvents: TourEvent[] = [
    {
      tourEventId:1, 
      shortDescription: 'Pasto - Santa Fe', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-22'),
      eventCity:'Pasto[PSO]',
      imgLocal:'Pasto.png',
      imgVisitante:'Santafe.png',
      value: 50000
    },
    {
      tourEventId:2, 
      shortDescription: 'Junior - Tolima', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-22'),
      eventCity:'Barranquilla[BAQ]',
      imgLocal:'Junior.png',
      imgVisitante:'Tolima.png',
      value: 50000
    },
    {
      tourEventId:3, 
      shortDescription: 'La Equidad - Deportivo Cali', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-21'),
      eventCity:'Bogota[BOG]',
      imgLocal:'Equidad.png',
      imgVisitante:'Cali.png',
      value: 50000
    },
    {
      tourEventId:4, 
      shortDescription: 'America - A. Nacional', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-21'),
      eventCity:'Cali[CAL]',
      imgLocal:'America.png',
      imgVisitante:'Nacional.png',
      value: 50000
    },
  ];

  constructor() { }

  ngOnInit(): void {
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

  private arrivalFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private originFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  searchFlights(form: FormGroup){
    console.log(form);
  }

  changeEvent(){    
    if(!this.tourEventControl.value)
      return this.destinationControl.setValue('');

    this.destinationControl.setValue(this.tourEvents[this.tourEventControl.value - 1].eventCity);    
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
}
