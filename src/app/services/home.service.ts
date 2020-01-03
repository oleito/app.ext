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
}
