import { EventosService } from './../../services/eventos.service';
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
  loadingElement:boolean=false;

  tourEvents: TourEvent[];
  
  constructor(private eventosService: EventosService) {
  }

  ngOnInit(): void {
    this.loadingElement = true;
    this.eventosService.getEventByCity(this.citySearch)
    .subscribe(response => {
      this.tourEvents = [];
      this.tourEvents = response;
      this.loadingElement = false;            
    });
  }

  selectingEvent(selectedEvent:TourEvent){
    this.click.emit(<TourEvent>selectedEvent);
  }
}
