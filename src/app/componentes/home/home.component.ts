import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  vehiculos: any[];
  movimientos: any[];
  piezas: any[];

  loadingMovData = true;
  loadingpiezasData = false;
  avanzandoSector = true;

  idTraza: number;
  tempInterval;

  constructor(private router: Router, private homeService: HomeService) { }

  ngOnInit() {
    // for dev only
    // this.router.navigate(['/modelo']);
    this.obtenerVehiculos();

    this.tempInterval = setInterval(() => {
      console.log('intentando obtener datos.');
      this.obtenerVehiculos();
    }, 60000);
  }

  // ngOnInit() {
  //   this.battleInit();
  //   this.id = setInterval(() => {
  //     this.battleInit(); 
  //   }, 5000);
  // }

  ngOnDestroy() {
    if (this.tempInterval) {
      clearInterval(this.tempInterval);
    }
  }

  obtenerVehiculos() {
    this.homeService.getVehiculos().subscribe(
      (res: HttpResponse<any>) => {
        this.vehiculos = res.body;
        console.table(this.vehiculos);
      },
      (err) => {
        console.log(err);
      });
  }

  actualizarModal(idtraza) {

    this.idTraza = idtraza;

    this.movimientos = [];
    this.loadingMovData = true;

    this.homeService.getMovimientosByTraza(idtraza).subscribe(
      (res: HttpResponse<any>) => {
        this.movimientos = res.body;
        console.log(this.movimientos);
        this.loadingMovData = false;
      }, (err) => {
        console.log(err);
      }
    );

    this.piezas = [];
    this.loadingpiezasData = true;

    this.homeService.getPiezasByTraza(idtraza).subscribe(
      (res: HttpResponse<any>) => {
        this.piezas = res.body;
        console.log(this.piezas);
        this.loadingpiezasData = false;
      }
    );
  }

  avanzarTraza() {
    this.avanzandoSector = true;
    this.homeService.avanzarTraza(this.idTraza, localStorage.getItem('idUsuario')).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body);
        this.obtenerVehiculos();
        this.avanzandoSector = false;
        console.log('avanzado');
      }, (err) => {
        console.log(err);
      }
    );
  }

}
