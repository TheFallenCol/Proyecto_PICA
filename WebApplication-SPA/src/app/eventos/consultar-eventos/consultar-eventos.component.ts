import { TourEvent } from './../../interfaces/TourEvent';
import { ObservableInput } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-consultar-eventos',
  templateUrl: './consultar-eventos.component.html',
  styleUrls: ['./consultar-eventos.component.scss']
})
export class ConsultarEventosComponent implements OnInit {
  isLinear = true;
  consultaFormGroup = new FormGroup({
    destinationControl: new FormControl('', Validators.required)
  });
  
  bookFormGroup = new FormGroup({
    secondCtrl: new FormControl('', Validators.required)
  });

  transportFormGroup = new FormGroup({
    thirdCtrl: new FormGroup({})
  })

  hotelFormGroup = new FormGroup({
    fourthCtrl: new FormControl('', Validators.required)
  })

  tourEvents: TourEvent[] = [
    {
      tourEventId:1, 
      shortDescription: 'Pasto - Santa Fe', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-22'),
      eventCity:'Pasto[PSO]',
      value: 50000
    },
    {
      tourEventId:2, 
      shortDescription: 'Junior - Tolima', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-22'),
      eventCity:'Barranquilla[BAQ]',
      value: 50000
    },
    {
      tourEventId:3, 
      shortDescription: 'La Equidad - Deportivo Cali', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-21'),
      eventCity:'Bogota[BOG]',
      value: 50000
    },
    {
      tourEventId:4, 
      shortDescription: 'America - A. Nacional', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-21'),
      eventCity:'Cali[CAL]',
      value: 50000
    },
  ];

  cityOptions: string[] = ['Barranquilla[BAQ]', 'Bogota[BOG]', 'Cali[CAL]', 'Pasto[PSO]'];
  filteredOptions: ObservableInput<string[]>;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.destinationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.arrivalFilter(value))
      );
  }

  private arrivalFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  comprarEvento(){
    console.log("Compró el evento");
  }

  get destinationControl(){
    return this.consultaFormGroup.get('destinationControl');
  }

  get thirdCtrl(){
    return this.consultaFormGroup.get('thirdCtrl');
  }

}
