import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  seguimientoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.seguimientoForm = this.formBuilder.group({
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      patente: new FormControl('', Validators.required),
      seguro: new FormControl('', Validators.required),
      orden: new FormControl('', Validators.required),
      pieza: new FormControl('', Validators.required),
      accion: new FormControl('', Validators.required),
      piezas: this.formBuilder.array([])

    });
    this.addPieza();
  }

  addPieza() {
    const piez = this.seguimientoForm.controls.piezas as FormArray;
    piez.push(this.formBuilder.group({
      pieza: new FormControl('', Validators.required),
      accion: new FormControl('', Validators.required)
    }));
  }

  cargarSeguimiento() {
    console.log(this.seguimientoForm.value);
  }

  ngOnInit() {
  }

}
