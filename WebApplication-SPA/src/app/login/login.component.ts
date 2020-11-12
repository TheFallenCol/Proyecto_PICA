import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({    
  });  

  constructor(fb : FormBuilder) { 
    this.form = fb.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get Nickname(){
    return this.form.get('nickname') as FormControl;
  }

  get Password(){
    return this.form.get('password') as FormControl;
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.Nickname.value, this.Password.value);
    // localStorage.setItem(this.Nickname.value, this.Password.value);
  }
}
