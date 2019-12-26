import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  constructor(private dataService: DataService) { }
  getModelo(marca) {
    console.log('getModelo');
    return this.dataService.getData('modelo?marca=' + marca);
  }

  postModelo(datos) {
    console.log('postModelo');
    return this.dataService.postData('modelo', datos);
  }
}
