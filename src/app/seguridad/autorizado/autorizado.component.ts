import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css']
})
export class AutorizadoComponent implements OnInit {

  @Input() rol: string

  constructor(
    private seguridadService: SeguridadService
  ) { }

  ngOnInit(): void {
  }

  estaAutorizado(): boolean {
    if (this.rol) {
      return this.seguridadService.obtenerRol() === this.rol;
    }
    return this.seguridadService.estaLogueado();
  }

}
