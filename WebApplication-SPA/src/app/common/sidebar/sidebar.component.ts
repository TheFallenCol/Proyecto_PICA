import { AuthService, IAuthStatus } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user : IAuthStatus = null;
  isUserLoged : boolean = false;

  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {
    this.authService.authStatusObserver.subscribe(userDetails => {
      this.user = userDetails;
      if(this.user.primarysid != null)
        this.isUserLoged = true;
    });
  }

  logOut(){
    this.isUserLoged = false;
    this.authService.logout();
  }
}
