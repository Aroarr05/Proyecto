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

  buscarDestinos(): void {
    this.destinosFiltrados = this.destinos.filter(destino =>
      destino.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminarDestino(id: number): void {
    if (confirm(`¿Eliminar destino con ID ${id}?`)) {
      this.destinoService.eliminarDestino(id).subscribe({
        next: () => {
          this.destinosFiltrados = this.destinosFiltrados.filter(destino => destino.id !== id);
          console.log(`Destino con ID: ${id} eliminado.`);
        },
        error: (error) => {
          console.error('Error al eliminar destino:', error);
          alert('Error al eliminar destino. Inténtalo más tarde.');
        }
      });
    }
  }
  
}
