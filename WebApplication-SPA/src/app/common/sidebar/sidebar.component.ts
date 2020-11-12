import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  nickName = "Anonymous";
  srcImage = "../../../assets/images/TouresBalon/default-profile.png";
  userLoged: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
