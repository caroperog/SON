import { Component } from '@angular/core';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent {

  
  ngOnInit(): void {
    this.CargarTodas();
  }

  constructor(private peticion: PeticionService) { }

  codigo: string = "";
  nombre: string = "";
  contrato: string = "";
  salario: string = "";
  estado: number = 1;
  datos: any[] = [];
  Idseleccionado: string = "";

  CargarTodas() {
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/nomina/list",
      payload: {}
    };
    this.peticion.Post(post.Host + post.path, post.payload).then((res: any) => {
      console.log(res);
      this.datos = res.data;
    });
  }

  AbrirModal() {
    // Limpiar valores por defecto cuando se abre el modal
    this.codigo = "";
    this.nombre = "";
    this.contrato = "";
    this.salario = "";
    this.estado = 1;
    this.Idseleccionado = "";
    /* this.empleadoId = "";  // Limpiar el ID del empleado cuando es nuevo */
    $('#modalnuevo').modal('show');  // Mostrar modal usando jQuery
  }

  Guardar() {
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/nomina/save",
      payload: {
        codigo: this.codigo,
        nombre: this.nombre,
        contrato: this.contrato,
        salario: this.salario,
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
          this.CargarTodas();  // Recargar la lista de nomina
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
      path: "/nomina/listId",
      payload: {
        _id: id
      }
    };
    this.peticion.Post(post.Host + post.path, post.payload).then(
      (res: any) => {
        console.log(res);
        this.codigo = res.data[0].codigo;
        this.nombre = res.data[0].nombre;
        this.contrato = res.data[0].contrato;
        this.salario = res.data[0].salario;
        this.estado = res.data[0].estado;

        $('#modalnuevo').modal('show');
      });
  }


  Eliminar() {
    let post = {
      Host: this.peticion.urlHost, //URL publica
      path: "/nomina/delete",
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
          this.CargarTodas();  // Recargar la lista de nomina
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
      path: "/nomina/update",
      payload: {
        _id: this.Idseleccionado,
        nombre: this.nombre,
        contrato: this.contrato,
        salario: this.salario,
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
          this.CargarTodas();  // Recargar la lista de nomina
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
