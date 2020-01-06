import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ModelosService } from 'src/app/services/modelos.service';
import { MarcaService } from 'src/app/services/marca.service';
import { SegurosService } from 'src/app/services/seguros.service';
import { SeguimientoService } from 'src/app/services/seguimiento.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  seguimientoForm: FormGroup;
  modelos: any[];
  marcas: any[];
  seguros: any[];

  seguimientos: any[];

  loadingModelos = true;

  constructor(
    public formBuilder: FormBuilder,
    private modelosService: ModelosService,
    private marcaService: MarcaService,
    private segurosService: SegurosService,
    private seguimientoService: SeguimientoService) { }

  ngOnInit() {
    this.seguimientoForm = this.formBuilder.group({
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      patente: new FormControl('', Validators.required),
      seguro: new FormControl('', Validators.required),
      orden: new FormControl('', Validators.required),
      piezas: this.formBuilder.array([]),
      fechaIngreso: new FormControl('', Validators.required),
      horaIngreso: new FormControl('', Validators.required),
      fechaSalidaAprox: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required)
    });
    this.getSeguimientos();
    this.getMarcas();
    this.getSeguros();

    this.addItems();
  }

  /*############### De reactive Form ###############*/
  get piezas() {
    return this.seguimientoForm.get('piezas') as FormArray
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      pieza: '',
      accion: ''
    });
  }
  deletePieza(i: number) {
    this.piezas.removeAt(i);
  }
  addItems() {
    this.piezas.push(this.createItem());
  }

  /*############### Obtencion de datos ###############*/
  getMarcas(): void {
    this.marcaService.getMarca().subscribe(
      (res: HttpResponse<any>) => {
        this.marcas = res.body;
      },
      (err) => {
        console.log(err);
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

  getSeguimientos(): void {
    this.seguimientoService.getSeguimiento().subscribe(
      (res: HttpResponse<any>) => {
        this.seguimientos = res.body;
        console.log('litado seguimientos');
        console.log(this.seguimientos);
      },
      (err) => {
        console.log(err);

      });
  }

  /*############# De Control de Acciones #############*/
  onMarcaChange(): void {
    console.log(this.seguimientoForm.value.marca);
    this.getModelos(this.seguimientoForm.value.marca);
  }

  onModeloChange() {
    console.log('cambio el modelo' + this.seguimientoForm.value.modelo);
  }

  getModelos(marca): void {

    this.modelosService.getModelo(marca).subscribe(
      (res: HttpResponse<any>) => {
        this.modelos = res.body;
        this.loadingModelos = false;
      },
      (err) => {
        console.log(err);
      });
  }

  /*############### Submit del formulario ###############*/
  onSubmit() {
    let datos;
    datos = {
      seguimiento: this.seguimientoForm.value
    };

    datos['seguimiento']['idUsuario'] = localStorage.getItem('idUsuario');
    console.log('datos a enviar');
    console.log(datos);
    this.seguimientoService.postSeguimiento(datos).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body);
        this.getSeguimientos();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarSeguimiento() {
    if (this.seguimientoForm.valid) {
      console.log('valido');
    } else {
      console.log('invalido');
    }
  }
}
