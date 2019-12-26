import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { MarcaService } from 'src/app/services/marca.service';
import { TiposcarroceriasService } from 'src/app/services/tiposcarrocerias.service';
import { ModelosService } from 'src/app/services/modelos.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {
  // VARIABLES PARA CONTROLES SPINNES Y DISABLED
  loadingCarroceria = false;
  loadingCarroceria2 = false;
  loadingModelos = false;
  loadingMarcas = false;
  loadingTipos = false;

  // Arreglos con listado datos
  marcas: any = [];
  modelos: any[];
  carrocerias: any = [];


  constructor(
    private marcaService: MarcaService,
    private tiposcarroceriasService: TiposcarroceriasService,
    private modelosService: ModelosService
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
  }

  /*################ DETECTORES DE EVENTOS ################*/
  onMarcaChange(): void {
    console.log(this.modeloForm.value.marca);
    this.getModelos(this.modeloForm.value.marca);
  }

  onModeloChange(): void {
    this.loadingCarroceria = true;
    console.log(this.modeloForm.value.modelo);

    console.log('onModeloChange');
    // actualizar la imagen
    setTimeout(() => {
      this.loadingCarroceria = false;
    }, 500);
  }

  onChangeCarroceria(): void {
    this.loadingCarroceria2 = true;
    console.log('Actualizar la imagen de carroceria');
    console.log(this.agregarModeloForm.value.tipo);
    setTimeout(() => {
      this.loadingCarroceria2 = false;
    }, 500);
  }


  /*################ ACTUADORES ################*/
  onSubmitSegurosForm() {
    console.log('Seguros Forms');
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
        console.log('getMarcas');
        console.log(this.marcas);
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
        console.log('getMarcas');
        console.log(this.modelos);
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
        console.log('getTipos');
        console.log(this.carrocerias);
        this.loadingTipos = false;
      },
      (err) => {
        console.log(err);
        this.loadingTipos = false;
      });
  }

}
