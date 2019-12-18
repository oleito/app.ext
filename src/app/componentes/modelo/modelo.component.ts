import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {

  loadingCarroceria = false;

  constructor() { }

  modeloForm = new FormGroup({
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required)
  });

  agregarMarcaForm = new FormGroup({
    marca: new FormControl('', Validators.required),
    marcaIniciales: new FormControl('', Validators.required)
  });

  agregarModeloForm = new FormGroup({
    marca2: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.getMarcas();
  }

  onMarcaChange(): void {
    console.log(this.modeloForm.value.marca);
    this.getModelos(this.modeloForm.value.marca);
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
    console.log('Actualizar la imagen de carroceria');
    console.log(this.agregarModeloForm.value.tipo);

  }

  getMarcas(): void {
    console.log('getMarcas');
  }
  getModelos(marca): void {
    console.log('getModelos - marca: ' + marca);
  }
  getCarrocerias(modelo): void {
    console.log('getCarroceria - modelo: ' + modelo);
  }
}
