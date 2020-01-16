import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Declaracion de variables
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Se declaran los metodos que nos conectaran con la API Rest
   */

  getData(section: string): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.get(this.apiUrl + section);
  }

  postData(section: string, datos: any): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.post(this.apiUrl + section, datos);
  }

  putData(section: string, datos: any): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.put(this.apiUrl + section, datos);
  }

  deleteData(section: string): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.delete(this.apiUrl + section);
  }

}
