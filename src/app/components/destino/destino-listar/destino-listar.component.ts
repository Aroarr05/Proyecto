import { Component } from '@angular/core';
import { Destino } from '../../../models/destino.model';
import { DestinoService } from '../../../services/destino.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-destino-listar',
  imports: [CommonModule,RouterModule],
  standalone:true,
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
