import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from 'src/app/services/orden.service';
import { HttpResponse } from '@angular/common/http';

import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-orden-interna',
  templateUrl: './orden-interna.component.html',
  styleUrls: ['./orden-interna.component.css']
})
export class OrdenInternaComponent implements OnInit {
  idTraza: any;
  piezas: any[];

  datos = {
    orden_idorden: 0,
    seguro: '',
    vhMarca: '',
    vhModelo: ''
  };


  loadingpiezasData: boolean;

  constructor(
    private route: ActivatedRoute,
    private ordenService: OrdenService
  ) { }

  ngOnInit() {
    this.idTraza = this.route.snapshot.params.numero;
    this.piezas = [];
    this.loadingpiezasData = true;

    this.ordenService.getDatosByTraza(this.idTraza).subscribe(
      (res: HttpResponse<any>) => {
        console.log('datosByTraza');
        console.log(res);
        this.datos = res.body[0];
        console.log(this.datos);
      }
    );

    this.ordenService.getPiezasByTraza(this.idTraza).subscribe(
      (res: HttpResponse<any>) => {
        this.piezas = res.body;
        console.log(this.piezas);
        this.loadingpiezasData = false;
      }
    );

    setTimeout(() => {
      this.generarPDF();

    }, 5000);
  }

  generarPDF() {
    // orden = this.datos.orden_idorden;

    const options = {
      filename: 'nombre.pdf',
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: { useCORS: true },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait'
      },
      useCORS: true
    };

    const content: Element = document.getElementById('toPDF');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }
}
