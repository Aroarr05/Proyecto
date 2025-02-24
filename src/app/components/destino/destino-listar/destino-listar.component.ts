import { Component } from '@angular/core';
import { Destino } from '../../../models/destino.model';
import { DestinoService } from '../../../services/destino.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-destino-listar',
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './destino-listar.component.html',
  styleUrl: './destino-listar.component.css'
})
export class DestinoListarComponent {

  destinos: Destino[]=[];
  filtro: string= '';

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

  buscarDestinos(): void {
    console.log('Buscando destinos con filtro: ', this.filtro);
  }

  get destinosFiltrados(): Destino[] {
    return this.destinos.filter(destino => {
      const nombre = destino.nombre.toLowerCase();
      return nombre.includes(this.filtro.toLowerCase());
    });
  }
  
}
