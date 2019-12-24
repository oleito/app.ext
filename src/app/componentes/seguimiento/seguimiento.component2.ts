import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  

  seguimientoForm: FormGroup;
  piezas: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.seguimientoForm = this.formBuilder.group({
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      patente: new FormControl('', Validators.required),
      seguro: new FormControl('', Validators.required),
      orden: new FormControl('', Validators.required),

      piezas: this.formBuilder.array([])
    });
  }


  createItem(): FormGroup {
    return this.formBuilder.group({
      pieza: '',
      accion: ''
    });
  }

  addPieza(): void {
    this.piezas = this.seguimientoForm.get('piezas') as FormArray;
    this.piezas.push(this.createItem());
  }

  deletePieza(i: number) {
    this.piezas.removeAt(i);
  }

  cargarSeguimiento() {
    console.log(this.seguimientoForm.valid);
    console.log(this.seguimientoForm.value);
  }

}
