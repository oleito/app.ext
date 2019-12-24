import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

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
  }


  /*################ DETECTORES DE EVENTOS ################*/
  onMarcaChange(): void {
    this.loadingModelos = true;
    console.log(this.modeloForm.value.marca);
    this.getModelos(this.modeloForm.value.marca);
    setTimeout(() => {
      this.loadingModelos = false;
    }, 2000);
  }
  onModeloChange(): void {
    this.loadingCarroceria = true;
    console.log(this.modeloForm.value.modelo);
    this.getCarrocerias(this.modeloForm.value.modelo);
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
  getMarcas(): void {
    console.log('getMarcas');
  }
  getModelos(marca): void {
    console.log('getModelos - marca: ' + marca);
  }
  getCarrocerias(modelo): void {
    console.log('getCarroceria - modelo: ' + modelo);
  }
  onSubmitSegurosForm() {
    console.log('algo');
  }
}
