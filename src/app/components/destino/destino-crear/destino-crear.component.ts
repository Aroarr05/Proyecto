import { Component } from '@angular/core';
import { DestinoService } from '../../../services/destino.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-destino-crear',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './destino-crear.component.html',
  styleUrl: './destino-crear.component.css'
})
export class DestinoCrearComponent {

  destinoForm: FormGroup; 

  constructor(
    private fb: FormBuilder, 
    private destinoService: DestinoService, 
    private router: Router
  ) {
    this.destinoForm = this.fb.group({
      nombre: ['', Validators.required],  
      ubicacion: ['', Validators.required],  
      lat: ['', [Validators.required, Validators.min(-90), Validators.max(90)]], 
      lng: ['', [Validators.required, Validators.min(-180), Validators.max(180)]], 
      imagen: [null, Validators.required]  
    });
  }
 
  agregarDestino(): void {
    if (this.destinoForm.valid) {
      const destino = this.destinoForm.value;
      if (destino.imagen && destino.imagen.name) {
        const imagenPath = './assets/destinos/' + destino.imagen.name;
        console.log('Imagen seleccionada:', imagenPath); // Verificar la ruta
  
        const destinoReestructurado = {
          id: Math.floor(Math.random() * 1000),  
          nombre: destino.nombre,
          ubicacion: destino.ubicacion,
          coordenadas: {
            lat: destino.lat,
            lng: destino.lng
          },
          imagen: imagenPath
        };
        this.destinoService.agregarDestino(destinoReestructurado).subscribe(() => {
          this.router.navigate(['/destino-listar']);
        });
      } else {
        alert('Por favor, suba una imagen.');
      }
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
  
  manejarCambioImagen(event: any): void {
    const archivo = event.target.files[0];
    console.log('Archivo seleccionado:', archivo); // Verificar el archivo
    if (archivo) {
      this.destinoForm.get('imagen')?.setValue(archivo);
    }
  }
  
  volver(): void {
    this.router.navigate(['/destino-listar']); 
  }

}
