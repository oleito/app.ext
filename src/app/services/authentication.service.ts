import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;

  constructor(private dataService: DataService) {}

  loginWithEmail(data: any): Observable<any> {
    console.log('loginWhitEmail');
    return this.dataService.postData('login', data);
  }

}
