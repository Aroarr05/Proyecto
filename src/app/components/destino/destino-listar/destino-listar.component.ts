import { Component } from '@angular/core';
import { Destino } from '../../../models/destino.model';
import { DestinoService } from '../../../services/destino.service';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destino-listar',
  imports: [RouterLink, CommonModule],
  templateUrl: './destino-listar.component.html',
  styleUrl: './destino-listar.component.css'
})
export class DestinoListarComponent {

  destinos: Destino[]=[];

  constructor (private destinoService: DestinoService){}


  ngOnInit(): void {
    this.destinoService.getDestinos().subscribe(data => {
      this.destinos = data;
    })
  }

  eliminarDestino(id: number): void {
    this.destinoService.eliminarDestino(id).subscribe(()=>
    {
      this.destinos = this.destinos.filter(destino => destino.id !== id)
    })
  }
}
