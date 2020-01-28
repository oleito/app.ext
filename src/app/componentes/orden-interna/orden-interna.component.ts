import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orden-interna',
  templateUrl: './orden-interna.component.html',
  styleUrls: ['./orden-interna.component.css']
})
export class OrdenInternaComponent implements OnInit {
  idTraza: any;

  constructor(private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idTraza = this.route.snapshot.params.numero
  };
}
