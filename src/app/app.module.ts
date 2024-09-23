import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './componentes/menu/menu.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { NominaComponent } from './componentes/nomina/nomina.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DashboardComponent,
    EmpleadosComponent,
    NominaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //conexión entre typescript y HTML
    HttpClientModule  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
