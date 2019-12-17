import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLogin, DataLogin } from 'src/app/interfaces/userLogin';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogedIn = false;
  error: any;

  constructor(private authenticationService: AuthenticationService) { }

  logInForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  onSubmit() {
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
    console.log(user);
    console.log(datos);

    this.authenticationService.loginWithEmail(datos).subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      this.isLogedIn = true;
    }, err => {
      console.log(err);
      this.isLogedIn = false;
    });
  }

}
