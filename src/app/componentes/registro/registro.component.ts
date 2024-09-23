import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

//definir estructura de elementos
export class RegistroComponent implements OnInit {

  ngOnInit(): void {
    
  }

  constructor(private peticion:PeticionService){

  }

  

  nombre:string = ""
  password:any[] = []
  email:string = "" 
  datos:any[] = []
  
  
 
  //creación de la función
  registrar() {

    this.peticion.Post("", {})

    console.log(this.nombre)
    console.log(this.password)
    console.log(this.email)

    this.datos.push({nombre:this.nombre, email:this.email})
    console.log(this.datos )
  }
}

