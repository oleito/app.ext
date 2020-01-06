import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private dataService: DataService) {
  }
  getVehiculos() {
    console.log('getVehiculosSeguimiento');
    return this.dataService.getData('traza');
  }

  getMovimientosByTraza(idtraza) {
    console.log('getMovimientosByTraza');
    return this.dataService.getData('traza/mov?idtraza=' + idtraza);
  }

  getPiezasByTraza(idtraza) {
    console.log('getPiezasByTraza');
    return this.dataService.getData('traza/piezas?idtraza=' + idtraza);
  }

  avanzarTraza(idtraza, idusuario) {
    return this.dataService.putData('traza/avanzar?idtraza=' + idtraza + '&idusuario=' + idusuario, null);
  }
}
