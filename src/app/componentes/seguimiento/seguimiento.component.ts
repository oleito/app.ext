import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent {
  constructor(public fb: FormBuilder) { }

  /*################ Registration Form ################*/
  registrationForm = this.fb.group({
    addDynamicElement: this.fb.array([])
  });

  /*############### Add Dynamic Elements ###############*/
  get addDynamicElement() {
    return this.registrationForm.get('addDynamicElement') as FormArray
  }

  addItems() {
    this.addDynamicElement.push(this.fb.control(''))
  }

  // Submit Registration Form
  onSubmit() {
    alert(JSON.stringify(this.registrationForm.value))
  }

}
