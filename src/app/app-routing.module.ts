import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { ModeloComponent } from './componentes/modelo/modelo.component';
import { SeguimientoComponent } from './componentes/seguimiento/seguimiento.component';
import { SegurosComponent } from './componentes/seguros/seguros.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'modelo', component: ModeloComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'seguro', component: SegurosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
