import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  seguimientoForm: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.seguimientoForm = this.formBuilder.group({
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      patente: new FormControl('', Validators.required),
      seguro: new FormControl('', Validators.required),
      orden: new FormControl('', Validators.required),
      piezas: this.formBuilder.array([]),
      fechaIngreso: new FormControl('', Validators.required),
      fechaSalidaAprox: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required)
    });
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

  /*############# De Control de Acciones #############*/
  onModeloChange() {
    console.log('cambio el modelo');
  }
  onMarcaChange() {
    console.log('cambio la marca');
  }

  /*############### Dubmi del formulario ###############*/
  onSubmit() {
    console.log(this.seguimientoForm.valid);
    console.log(this.seguimientoForm.value);
  }
  cargarSeguimiento() {
    if (this.seguimientoForm.valid) {
      console.log('valido');
    } else {
      console.log('invalido');
    }
  }

}
