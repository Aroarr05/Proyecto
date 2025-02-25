import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { Destino } from '../../../models/destino.model';
import { DestinoService } from '../../../services/destino.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Coordenadas } from '../../../models/destino.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-destino-listar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './destino-listar.component.html',
  styleUrls: ['./destino-listar.component.css'],
  standalone: true,
})
export class DestinoListarComponent implements OnInit, AfterViewInit {
  destinos: Destino[] = [];
  destinosFiltrados: Destino[] = [];
  filtro: string = '';
  private map: any; // Variable para almacenar la instancia del mapa
  private L: any; // Variable para almacenar la instancia de Leaflet

  constructor(
    private destinoService: DestinoService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.destinoService.getDestinos().subscribe(data => {
      this.destinos = data;
      this.destinosFiltrados = data;
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar Leaflet dinámicamente solo en el navegador
      import('leaflet').then((L: typeof import('leaflet')) => {
        this.L = L; // Almacenar L en una variable de clase
        // Inicializar el mapa si es necesario
        this.initializeMap();
      });
    }
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

  verMapa(coordenadas: Coordenadas): void {
    if (isPlatformBrowser(this.platformId)) {
      // Si el mapa ya está inicializado, actualiza la vista
      if (this.map) {
        this.map.setView([coordenadas.lat, coordenadas.lng], 13);
        this.L.marker([coordenadas.lat, coordenadas.lng]).addTo(this.map)
          .bindPopup(`<b>${coordenadas.lat}, ${coordenadas.lng}</b>`)
          .openPopup();
      }
    }
  }

  private initializeMap(): void {
    // Inicializar el mapa solo si no está ya inicializado
    if (!this.map) {
      this.map = this.L.map('map').setView([0, 0], 2); // Vista inicial del mapa

      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
  }
}