import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  showFiller = false;

  constructor() { }

  ngOnInit(): void {
  }

}
