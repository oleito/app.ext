import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {

  constructor() { }

  modeloForm = new FormGroup({
    modelo: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }

}
