import { Injectable } from '@angular/core';
import { credencialesUsuario, respuestaAutenticacion } from './seguridad';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  apiURL = environment.apiURL + 'cuentas'

  estaLogueado(): boolean {
    return false;
  }

  obtenerRol(): string {
    return 'admin';
  }

  registrar(credencialesUsuario: credencialesUsuario): Observable<respuestaAutenticacion> {

    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/crear', credencialesUsuario)
  }
}
