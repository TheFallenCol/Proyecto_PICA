import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Hotel } from 'src/app/interfaces/Hotel';

@Component({
  selector: 'app-card-hotel',
  templateUrl: './card-hotel.component.html',
  styleUrls: ['./card-hotel.component.scss']
})
export class CardHotelComponent implements OnInit, OnChanges{
  @Input('hotelInformation') hotelInformation : Hotel[];
  @Input('informationCard') informationCard: boolean = false;
  @Output('selected') click = new EventEmitter();
  srcImage = '../../../assets/images/Hoteles/';
  loadingElement:boolean=false;

  hotelList: Hotel[];
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.hotelList = this.hotelInformation;
  }

  selectingHotel(selectedHotel:Hotel){
    this.click.emit(<Hotel>selectedHotel);
  }
}
