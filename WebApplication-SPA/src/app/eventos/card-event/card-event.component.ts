import { TourEvent } from './../../interfaces/TourEvent';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss']
})
export class CardEventComponent implements OnInit {
  @Input('citySearch') citySearch : string;
  @Output('selected') click = new EventEmitter();

  srcImage = '../../../assets/images/Equipos/';

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
    console.log(this.citySearch);
  }

  onClick(){
    this.click.emit(<TourEvent>{ 
      tourEventId:1, 
      shortDescription: 'Pasto - Santa Fe', 
      description: 'Cuartos de Final - Liga Betplay I 2020', 
      eventDate: new Date('2020-11-22'),
      eventCity:'Pasto[PSO]',
      value: 50000
    });
  }
}
