import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './componentes/login/login.component';
import { AuthenticationInterceptor } from './services/authentication.interceptor';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './componentes/home/home.component';
import { SeguimientoComponent } from './componentes/seguimiento/seguimiento.component';
import { ModeloComponent } from './componentes/modelo/modelo.component';
import { SegurosComponent } from './componentes/seguros/seguros.component';
import { OrdenInternaComponent } from './componentes/orden-interna/orden-interna.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SeguimientoComponent,
    ModeloComponent,
    SegurosComponent,
    OrdenInternaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
