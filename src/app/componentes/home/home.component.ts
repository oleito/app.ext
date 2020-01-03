import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vehiculos: any[];
  movimientos: any[];

  loadingModalData = true;

  constructor(private router: Router, private homeService: HomeService) { }

  ngOnInit() {
    // for dev only
    // this.router.navigate(['/modelo']);
    this.obtenerVehiculos();
  }

  obtenerVehiculos() {
    this.homeService.getVehiculos().subscribe(
      (res: HttpResponse<any>) => {
        this.vehiculos = res.body;
        console.table(this.vehiculos);
      },
      (err) => {
        console.log(err);
      });
  }

  actualizarModal(idtraza) {
    this.loadingModalData = true;

    this.homeService.getMovimientosByTraza(idtraza).subscribe(
      (res: HttpResponse<any>) => {
        this.movimientos = res.body;
        console.log(this.movimientos);
      }, (err) => {
        console.log(err)
      }

    )
    console.log(idtraza);



    setTimeout(() => {
      this.loadingModalData = false;
    }, 2000);
  }

}
