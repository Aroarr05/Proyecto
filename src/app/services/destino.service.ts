import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Destino } from '../models/destino.model';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  private apiUrl ='assets/destinos.json';

  constructor(private http: HttpClient) { }

  getDestinos(): Observable<Destino[]>{
    return this.http.get<Destino[]>(this.apiUrl);
  }
}
