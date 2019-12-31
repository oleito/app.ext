import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { MarcaService } from 'src/app/services/marca.service';
import { TiposcarroceriasService } from 'src/app/services/tiposcarrocerias.service';
import { ModelosService } from 'src/app/services/modelos.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {
  // VARIABLES PARA CONTROLES SPINNES Y DISABLED
  loadingCarroceria = false;
  loadingCarroceria2 = false;
  loadingModelos = true;
  loadingMarcas = false;
  loadingTipos = false;


  // Arreglos con listado datos
  marcas: any = [];
  modelos: any[];
  carrocerias: any = [];
  seguros: any = [];

  // Variables auxiliares
  aux1: any;
  aux2: any;

  // Variables de UI
  urlTipoCarroceriaHome = 'https://placehold.it/350x220';
  urlTipoCarroceriaForm = 'https://placehold.it/350x220';


  constructor(
    private marcaService: MarcaService,
    private tiposcarroceriasService: TiposcarroceriasService,
    private modelosService: ModelosService,
    private segurosService: SegurosService
  ) { }

  /*################ FORMULARIOS MAIN ################*/
  modeloForm = new FormGroup({
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required)
  });
  segurosForm = new FormGroup({
    seguroNombre: new FormControl('', Validators.required)
  });


  /*################ FORMULARIOS MODALES ################*/
  agregarMarcaForm = new FormGroup({
    marca: new FormControl('', Validators.required),
    marcaIniciales: new FormControl('', Validators.required)
  });
  agregarModeloForm = new FormGroup({
    marca2: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required)
  });
  agregarSeguroForm = new FormGroup({
    seguro: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.getMarcas();
    this.getTipos();
    this.getSeguros();
  }

  /*################ DETECTORES DE EVENTOS ################*/
  onMarcaChange(): void {
    console.log(this.modeloForm.value.marca);
    this.getModelos(this.modeloForm.value.marca);
  }

  onModeloChange(): void {
    this.loadingCarroceria = true;
    this.tiposcarroceriasService.getTipoByModelo(this.modeloForm.value.modelo).subscribe(
      (res: HttpResponse<any>) => {
        this.aux1 = res.body;
        this.urlTipoCarroceriaHome = this.aux1[0]['vhTipo_img'];
        this.loadingCarroceria = false;
      },
      (err) => {
        console.log(err);
        this.loadingCarroceria = false;
      });
  }

  onChangeCarroceria(): void {
    this.loadingCarroceria2 = true;
    this.tiposcarroceriasService.getTipoById(this.agregarModeloForm.value.tipo).subscribe(
      (res: HttpResponse<any>) => {
        this.aux2 = res.body;
        this.urlTipoCarroceriaForm = this.aux2[0]['vhTipo_img'];
        this.loadingCarroceria2 = false;
      },
      (err) => {
        console.log(err);

        this.loadingCarroceria2 = false;
      });
  }


  /*################ ACTUADORES ################*/
  onSubmitSegurosForm() {
    let datos = {
      seguro:
      {
        seguroNombre: this.segurosForm.value.seguroNombre
      }
    };
    console.log(datos);
    this.segurosService.postSeguro(datos).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body);
        this.getSeguros();
        this.segurosForm.value.seguroNombre = '';
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addModelo() {
    let datos;
    datos = {
      modelo:
      {
        modeloNombre: this.agregarModeloForm.value.modelo,
        modeloMarca: this.agregarModeloForm.value.marca2,
        modeloTipo: this.agregarModeloForm.value.tipo
      }
    };
    this.modelosService.postModelo(datos).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body);
      },
      (err) => {
        console.log(err);
        this.loadingMarcas = false;
      }
    );
  }

  addMarca() {
    let datos;
    datos = {
      marca:
      {
        marcaNombre: this.agregarMarcaForm.value.marca,
        marcaIniciales: this.agregarMarcaForm.value.marcaIniciales
      }
    };
    this.marcaService.postMarca(datos).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body);
        this.getMarcas();
      }
    );
  }

  /*################ SERVICIOS INTERNOS ################*/
  getMarcas(): void {
    this.loadingMarcas = true;
    this.marcaService.getMarca().subscribe(
      (res: HttpResponse<any>) => {
        this.marcas = res.body;
        this.loadingMarcas = false;
      },
      (err) => {
        console.log(err);
        this.loadingMarcas = false;
      });
  }

  getModelos(marca): void {
    this.loadingModelos = true;
    this.modelosService.getModelo(marca).subscribe(
      (res: HttpResponse<any>) => {
        this.modelos = res.body;
        this.loadingModelos = false;
      },
      (err) => {
        console.log(err);
        this.loadingMarcas = false;
      });
  }

  getTipos(): void {
    this.loadingTipos = true;
    this.tiposcarroceriasService.getTipos().subscribe(
      (res: HttpResponse<any>) => {
        this.carrocerias = res.body;
        this.loadingTipos = false;
      },
      (err) => {
        console.log(err);
        this.loadingTipos = false;
      });
  }

  getSeguros(): void {
    this.segurosService.getSeguro().subscribe(
      (res: HttpResponse<any>) => {
        this.seguros = res.body;
      },
      (err) => {
        console.log(err);
      });
  }

}
