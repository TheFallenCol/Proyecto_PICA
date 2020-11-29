import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {   
  form = new FormGroup({
    nickname : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loginError : string = '';
  loadingElement: boolean = false;

  constructor(private authService:AuthService, private router:Router) {
  }

  get nickname(){
    return this.form.get('nickname');
  }

  get password(){
    return this.form.get('password');
  }

  ngOnInit(): void {
  }

  login(form){
    this.loadingElement = true;
    this.authService.login(this.nickname.value, this.password.value)
    .subscribe(authResponse => {
      this.loadingElement = false;
      this.router.navigate(['eventos/consulta']);
    },
      error => {
        this.loadingElement = false;
        this.form.setErrors({
          loginError: true
        });
    });
  }
}
