import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-listar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  filtro: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      this.usuariosFiltrados = data;
    });
  }

  buscarUsuarios(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminarUsuario(id: number): void {
    if (confirm(`¿Eliminar usuario con ID ${id}?`)) {
      console.log(`Eliminando usuario con ID: ${id}`);  
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: (response) => {
          console.log('Usuario eliminado correctamente', response); 
          this.usuariosFiltrados = this.usuariosFiltrados.filter(usuario => usuario.id !== id);
          console.log(`Usuario con ID: ${id} eliminado.`);
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar usuario. Inténtalo más tarde.');
        }
      });
    }
  }
}
