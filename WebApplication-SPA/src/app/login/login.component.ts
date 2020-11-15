import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { 
  }

  get nickname(){
    return this.form.get('nickname');
  }

  get password(){
    return this.form.get('password');
  }

  ngOnInit(): void {
  }

  login(){
    this.form.setErrors({
      loginError: true
    });

    console.log(this.nickname.value, this.password.value);
    // localStorage.setItem(this.Nickname.value, this.Password.value);
  }
}
