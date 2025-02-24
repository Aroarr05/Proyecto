import { Component } from '@angular/core';
import { Destino } from '../../../models/destino.model';
import { DestinoService } from '../../../services/destino.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-destino-listar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './destino-listar.component.html',
  styleUrls: ['./destino-listar.component.css']
})
export class DestinoListarComponent {

  destinos: Destino[] = [];
  destinosFiltrados: Destino[] = []; 
  filtro: string = ''; 

  constructor(private destinoService: DestinoService) {}

  ngOnInit(): void {
    this.destinoService.getDestinos().subscribe(data => {
      this.destinos = data;
      this.destinosFiltrados = data; 
    });
  }

  eliminarDestino(id: number): void {
    this.destinoService.eliminarDestino(id).subscribe(() => {
      this.destinos = this.destinos.filter(destino => destino.id !== id);
      this.destinosFiltrados = this.destinosFiltrados.filter(destino => destino.id !== id);
    });
  }

  buscarDestinos(): void {
    this.destinosFiltrados = this.destinos.filter(destino =>
      destino.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
