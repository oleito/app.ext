import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { HttpResponse } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { OrdenService } from 'src/app/services/orden.service';

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

  ingresoQT: number;

  vhIngreso = 0;
  vhChapa = 0;
  vhPreparacion = 0;
  vhReparacion = 0;
  vhArmado = 0;
  vhEstetica = 0;

  datos = {
    orden_idorden: 0,
    seguro: '',
    vhMarca: '',
    vhModelo: '',
    vhTipo_img_all: '',
    traza_observaciones: ''
  };

  constructor(
    private router: Router,
    private homeService: HomeService,
    private ordenService: OrdenService
  ) { }

  avanzarForm = new FormGroup({
    avanzarFecha: new FormControl('', Validators.required),
    avanzarHora: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.obtenerVehiculos();

    this.tempInterval = setInterval(() => {
      console.log('intentando obtener datos.');
      this.obtenerVehiculos();
    }, 60000);
    this.avanzarForm.controls.avanzarFecha.setValue(new Date('dd-mm-yyyy'));
  }



  ngOnDestroy() {
    if (this.tempInterval) {
      clearInterval(this.tempInterval);
    }
  }

  obtenerVehiculos() {
    this.homeService.getVehiculos().subscribe(
      (res: HttpResponse<any>) => {
        this.vehiculos = res.body;
        this.calcularCantidades(this.vehiculos);
        console.table(this.vehiculos);

      },
      (err) => {
        console.log(err);
      });
  }

  actualizarModal(idtraza) {
    this.ordenService.getDatosByTraza(idtraza).subscribe(
      (res: HttpResponse<any>) => {
        console.log('datosByTraza');
        console.log(res);
        this.datos = res.body[0];
        console.log(this.datos);
      }
    );
    /*********************** */

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
    console.log('Avanza la cosa');
  }


  onSubmitAvanzarForm() {
    let datos = {
      avanzar:
      {
        avanzarFecha: this.avanzarForm.value.avanzarFecha,
        avanzarHora: this.avanzarForm.value.avanzarHora
      }
    };
    this.homeService.avanzarTraza(this.idTraza, localStorage.getItem('idUsuario'), datos).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body);
        this.obtenerVehiculos();
        this.avanzandoSector = false;
      }, (err) => {
        console.log(err);
      }
    );
    console.log(datos);
  }


  calcularCantidades(vehiculos) {
    this.vhIngreso = 0;
    this.vhChapa = 0;
    this.vhPreparacion = 0;
    this.vhReparacion = 0;
    this.vhArmado = 0;
    this.vhEstetica = 0;

    vehiculos.forEach(element => {
      switch (element.chSector) {
        case 'Ingreso':
          this.vhIngreso++;
          break;
        case 'Desarme':
          this.vhChapa++;
          break;
        case 'Reparacion':
          this.vhChapa++;
          break;
        case 'Preparacion':
          this.vhPreparacion++;
          break;
        case 'Pintura':
          this.vhReparacion++;
          break;
        case 'Armado':
          this.vhArmado++;
          break;
        case 'Estetica':
          this.vhEstetica++;
          break;

        default:
          break;
      }
    });
  }
}
