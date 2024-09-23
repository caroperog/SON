import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {


  ngOnInit(): void {
    this.CargarTodas();
    this.CargarTodasContrato();
  }

  constructor(private peticion: PeticionService) { }

  codigo: string = "";
  cedula: string = "";
  nombre: string = "";
  apellido: string = "";
  estado: number = 1;
  datos: any[] = [];
  datosContrato: any[] = [];
  Idseleccionado: string = "";

  CargarTodasContrato() {
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/nomina/list",
      payload: {}
    };
    this.peticion.Post(post.Host + post.path, post.payload).then((res: any) => {
      console.log(res);
      this.datosContrato = res.data;
    });
  }


  CargarTodas() {
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/empleados/list",
      payload: {}
    };
    this.peticion.Post(post.Host + post.path, post.payload).then((res: any) => {
      console.log(res);
      this.datos = res.data;
    });
  }

  AbrirModal() {
    // Limpiar valores por defecto cuando se abre el modal
    this.codigo = this.datosContrato[0].codigo //cargar la posición del elemento por defecto
    this.cedula = "";
    this.nombre = "";
    this.apellido = "";
    this.estado = 1;
    this.Idseleccionado = "";
    /* this.empleadoId = "";  // Limpiar el ID del empleado cuando es nuevo */
    $('#modalnuevo').modal('show');  // Mostrar modal usando jQuery
  }

  Guardar() {
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/empleados/save",
      payload: {
        codigo: this.codigo,
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        estado: this.estado
      }
    };

    this.peticion.Post(post.Host + post.path, post.payload).then(
      (res: any) => {
        console.log(res);
        if (res.state == 1) {
          Swal.fire({
            icon: "success",
            title: "Que bien!",
            text: res.mensaje,

          });
          $('#modalnuevo').modal('hide');  // Cerrar el modal
          this.CargarTodas();  // Recargar la lista de empleados
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Error en la creación",
            text: res.mensaje,

          });
        }

      });
  }

  EditarId(id: string) {
    this.Idseleccionado = id
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/empleados/listId",
      payload: {
        _id: id
      }
    };
    this.peticion.Post(post.Host + post.path, post.payload).then(
      (res: any) => {
        console.log(res);
        this.codigo = res.data[0].codigo;
        this.cedula = res.data[0].cedula;
        this.nombre = res.data[0].nombre;
        this.apellido = res.data[0].apellido;
        this.estado = res.data[0].estado;

        $('#modalnuevo').modal('show');
      });
  }


  Eliminar() {
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/empleados/delete",
      payload: {
        _id: this.Idseleccionado
      }
    };

    this.peticion.Post(post.Host + post.path, post.payload).then(
      (res: any) => {
        console.log(res);
        if (res.state == 1) {
          Swal.fire({
            icon: "success",
            title: "Que bien!",
            text: res.mensaje,

          });
          $('#modalnuevo').modal('hide');  // Cerrar el modal
          this.CargarTodas();  // Recargar la lista de empleados
        } 
        
        else {
          Swal.fire({
            icon: "error",
            title: "error en actualizar",
            text: res.mensaje,

          });
        }

      });
  }

  Actualizar() {
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/empleados/update",
      payload: {
        _id: this.Idseleccionado,
        codigo: this.codigo,
        nombre: this.nombre,
        apellido: this.apellido,
        estado: this.estado
      }
    };

    this.peticion.Post(post.Host + post.path, post.payload).then(
      (res: any) => {
        console.log(res);
        if (res.state == 1) {
          Swal.fire({
            icon: "success",
            title: "Que bien!",
            text: res.mensaje,

          });
          $('#modalnuevo').modal('hide');  // Cerrar el modal
          this.CargarTodas();  // Recargar la lista de empleados
        }
        else {
          Swal.fire({
            icon: "error",
            title: "error en actualizar",
            text: res.mensaje,

          });
        }

      });
  }

}
