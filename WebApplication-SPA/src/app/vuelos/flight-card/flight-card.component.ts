import { TourEvent } from './../../interfaces/TourEvent';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {
  @Input('citySearch') citySearch : string;
  @Output('selected') click = new EventEmitter();
  srcImage = '../../../assets/images/Equipos/';
  selectedEvent:TourEvent;

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
    {
      tourEventId:5, 
      shortDescription: 'Santa Fe - Pasto', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-28'),
      eventCity:'Bogota[BOG]',
      imgLocal:'Santafe.png',
      imgVisitante:'Pasto.png',
      value: 50000
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.citySearch);
  }

  selectingEvent(selectedEvent:TourEvent){       
    this.click.emit(<TourEvent>selectedEvent);    
  }
}
