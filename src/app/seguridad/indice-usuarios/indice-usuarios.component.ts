import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { usuarioDTO } from '../seguridad';
import { MatTable } from '@angular/material/table';
import { SeguridadService } from '../seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css']
})
export class IndiceUsuariosComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { }

  @ViewChild('table') table: MatTable<any>;

  usuarios: usuarioDTO[];
  columnasAMostrar = ['email', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar) {
    this.seguridadService.obtenerUsuarios(pagina, cantidadElementosAMostrar)
      .subscribe((respuesta: HttpResponse<usuarioDTO[]>) => {
        this.usuarios = respuesta.body;
        this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
      }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  hacerAdmin(usuarioId: string) {
    this.seguridadService.hacerAdmin(usuarioId)
      .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }

  removerAdmin(usuarioId: string) {
    this.seguridadService.removerAdmin(usuarioId)
      .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }

}
