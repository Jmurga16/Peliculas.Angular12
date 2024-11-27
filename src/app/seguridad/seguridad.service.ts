import { Injectable } from '@angular/core';
import { credencialesUsuario, respuestaAutenticacion } from './seguridad';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  apiURL = environment.apiURL + 'cuentas'
  private readonly llaveToken = 'token'
  private readonly llaveExpiracion = 'token-expiracion'

  constructor(
    private httpClient: HttpClient
  ) {

  }



  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken)

    if (!token) {
      return false
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion)
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()) {
      return false
    }

    return true;
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol(): string {
    return 'admin';
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken)

    if (!token) {
      return ''
    }

    var dataToken = JSON.parse(atob(token.split('.')[1]));

    return dataToken[campo]
  }

  registrar(credencialesUsuario: credencialesUsuario): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/crear', credencialesUsuario)
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }

  login(credencialesUsuario: credencialesUsuario): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/login', credencialesUsuario)
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken)
  }

}
