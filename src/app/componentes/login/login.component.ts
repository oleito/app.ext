import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/interfaces/userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  logInForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required,])
  });

  ngOnInit() {
  }

  onSubmit() {
    const datos = [];
    let user: UserLogin = this.logInForm.value;
    datos['user'] = user;
    console.log(datos);
  }

}
