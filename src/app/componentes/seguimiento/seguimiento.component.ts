import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent {
  constructor(public formBuilder: FormBuilder) { }

  /*################ Registration Form ################*/
  seguimientoForm = this.formBuilder.group({
    addDynamicElement: this.formBuilder.array([])
  });

  /*############### Add Dynamic Elements ###############*/
  get addDynamicElement() {
    return this.seguimientoForm.get('addDynamicElement') as FormArray
  }

  addItems() {
    this.addDynamicElement.push(this.formBuilder.control('', Validators.required));
  }

  // Submit Registration Form
  onSubmit() {
    console.log(this.seguimientoForm.valid);
    console.log(this.seguimientoForm.value);
  }

}
