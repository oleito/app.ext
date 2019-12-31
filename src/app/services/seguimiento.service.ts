import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  constructor(private dataService: DataService) { }

  /*############### Obtencion de datos ###############*/
  getSeguimiento() {
    console.log('getSeguimiento');
    return this.dataService.getData('traza');
  }
  postSeguimiento(datos) {
    console.log('postSeguimiento');
    return this.dataService.postData('traza', datos);
  }

}
