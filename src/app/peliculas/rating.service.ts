import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculaPostGet, PeliculaPutGet } from './pelicula';
import { SeguridadService } from '../seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient,
    
  ) { }
  private apiURL = environment.apiURL + 'rating';

  rate(peliculaId: number, puntuacion: number) {
    return this.http.post(this.apiURL, { peliculaId, puntuacion })
  }

}
