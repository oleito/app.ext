import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {

  constructor(private dataService: DataService) { }
  getSeguro() {
    console.log('getSeguro');
    return this.dataService.getData('seguro');
  }

  postSeguro(datos) {
    console.log('postSeguro');
    return this.dataService.postData('seguro', datos);
  }
}
