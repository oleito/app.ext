import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  constructor() { }
  seguimientoForm = new FormGroup({
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    patente: new FormControl('', Validators.required),
    seguro: new FormControl('', Validators.required),
    orden: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

}
