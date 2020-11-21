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
  
  loginError : string = '';
  form = new FormGroup({
    nickname : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

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
    this.authService.login(this.nickname.value, this.password.value)
    .subscribe(authResponse => {
      this.router.navigate(['']);
    },
      error => {
        this.form.setErrors({
          loginError: true
        });
    });

    // localStorage.setItem(this.Nickname.value, this.Password.value);
  }
}
