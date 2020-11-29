import { ComprasModule } from './compras/compras.module';
import { AppErrorHandler } from './common/app-error-handler';
import { EventosModule } from './eventos/eventos.module';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

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
import { VuelosModule } from './vuelos/vuelos.module';

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
    LoginModule,
    EventosModule,
    VuelosModule,
    ComprasModule,
    AppRoutingModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
