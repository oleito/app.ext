import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private dataService: DataService) { }

  getPiezasByTraza(idtraza: number) {
    console.log('getPiezasByTraza');
    return this.dataService.getData('traza/piezas?idtraza=' + idtraza);
  }


  getDatosByTraza(idtraza: number) {
    console.log('getDatosByTraza');
    return this.dataService.getData('traza/datos?idtraza=' + idtraza);
  }

}
