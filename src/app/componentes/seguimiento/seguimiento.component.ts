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
      addDynamicElement: this.formBuilder.array([])
    });

  }
  /*################ Registration Form ################*/

  /*############### Add Dynamic Elements ###############*/
  get addDynamicElement() {
    return this.seguimientoForm.get('addDynamicElement') as FormArray
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      pieza: '',
      accion: ''
    });
  }
  deletePieza(i: number) {
    this.addDynamicElement.removeAt(i);
  }

  addItems() {
    this.addDynamicElement.push(this.createItem());
  }

  // Submit Registration Form
  onSubmit() {
    console.log(this.seguimientoForm.valid);
    console.log(this.seguimientoForm.value);
  }

}
