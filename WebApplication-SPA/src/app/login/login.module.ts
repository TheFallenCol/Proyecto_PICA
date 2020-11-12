import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
