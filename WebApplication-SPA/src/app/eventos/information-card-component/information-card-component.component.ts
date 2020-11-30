import { TourEvent } from './../../interfaces/TourEvent';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-information-card-component',
  templateUrl: './information-card-component.component.html',
  styleUrls: ['./information-card-component.component.scss']
})
export class InformationCardComponentComponent implements OnInit, OnChanges {
  @Input('touresEventToShow') touresEventToShow : TourEvent[];
  @Input('tourEventToShow') tourEventToShow : TourEvent;
  @Input('multipleTours') multipleTours : boolean;
  srcImage = '../../../assets/images/Equipos/';
  tours : Array<TourEvent>


  constructor() { }
 
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tours = [];
    
    if(this.multipleTours){
      this.tours = this.touresEventToShow;
    }
    else{
      this.tours.push(this.tourEventToShow);
    }
  }
}
