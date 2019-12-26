import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private dataService: DataService) {}
   getMarca() {
     console.log('getMarca');
     return this.dataService.getData('marca');
   }
   postMarca(data) {
    console.log('postMarca');
    return this.dataService.postData('marca', data);
  }
}
