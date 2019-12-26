import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TiposcarroceriasService {

  constructor(private dataService: DataService) { }
  getTipos() {
    console.log('getTipos');
    return this.dataService.getData('tipo');
  }

}
