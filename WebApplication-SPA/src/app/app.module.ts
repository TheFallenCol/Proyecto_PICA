import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuNavbarComponent } from './common/menu-navbar/menu-navbar.component';

const routes : Routes = [
  { path:'', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'**', component:NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,    
    NotFoundComponent, 
    MenuNavbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,  
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
