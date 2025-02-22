import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Destino } from '../models/destino.model';


@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  private apiUrl ='http://localhost:3001/destinos';

  constructor(private http: HttpClient) { }

  getDestinos(): Observable<Destino[]>{
    return this.http.get<Destino[]>(this.apiUrl);
  }

  getDestinoPorId(id: number): Observable<Destino> {
    return this.http.get<Destino>(`${this.apiUrl}/${id}`);
  }

  agregarDestino(destino: Destino): Observable<Destino>{
    return this.http.post<Destino>(this.apiUrl, destino);
  }

  actualizarDestino(id:number, destino: Destino): Observable<Destino>{
    return this.http.put<Destino>(`${this.apiUrl}/${id}`, destino);
  }

  eliminarDestino(id:number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
