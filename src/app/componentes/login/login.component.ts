import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/interfaces/userLogin';
import { DataLogin } from 'src/app/interfaces/DataLogin';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLogedIn = false;
  tryingLogIn = false;
  logInErr = false;
  error: any;

  constructor(private authenticationService: AuthenticationService) { }

  logInForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    //this.onSubmit();
  }

  onSubmit() {

    this.tryingLogIn = true;
    this.logInErr = false;
    let datos: DataLogin;
    const user: UserLogin = this.logInForm.value;

    // datos = {
    //   user:
    //   {
    //     userName: this.logInForm.value.userName,
    //     userPassword: this.logInForm.value.userPassword
    //   }
    // };

    datos = {
      user:
      {
        userName: 'sistemas@parisautos.com.ar',
        userPassword: '1q2w3eparisNadarisca32'
      }
    };

    this.authenticationService.loginWithEmail(datos).subscribe((res: HttpResponse<any>) => {
      this.authenticationService.isLoggedIn = true;
      this.isLogedIn = true;
      this.tryingLogIn = false;
    }, err => {
      console.log(err);
      this.isLogedIn = false;
      this.tryingLogIn = false;
      this.logInErr = true;
    });

  }

}
