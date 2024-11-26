import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { credencialesUsuario } from '../seguridad';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  errores: string[] = []

  registrar(credenciales: credencialesUsuario) {
    this.seguridadService.registrar(credenciales).subscribe(respuesta => {
      console.log(respuesta)
      this.seguridadService.guardarToken(respuesta);
      this.router.navigate(['/'])
    },
      errores => this.errores = parsearErroresAPI(errores)

    );
  }

}