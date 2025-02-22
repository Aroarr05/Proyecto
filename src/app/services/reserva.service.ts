import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'assets/reservas.json';

  constructor(private http: HttpClient) { }

  getReservas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.apiUrl);
  }

}
