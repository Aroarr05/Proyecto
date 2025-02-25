import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../../../services/destino.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-destino-editar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './destino-editar.component.html',
  styleUrls: ['./destino-editar.component.css']
})
export class DestinoEditarComponent implements OnInit {
  destinoForm: FormGroup;
  mostrarFormulario = false;
  destino!: any; 

  constructor(
    private fb: FormBuilder,
    private destinoService: DestinoService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.destinoForm = this.fb.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      lat: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      imagen: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      console.log("Destiny ID:", id);
      this.destinoService.getDestinoPorId(+id).subscribe({
        next: (data) => {
          this.destino = data;
          // Carga los datos en el formulario
          this.destinoForm.patchValue({
            nombre: data.nombre,
            ubicacion: data.ubicacion,
            coordenadas: {
              lat: data.coordenadas.lat,
              lng: data.coordenadas.lng
            },
            imagen: data.imagen
          });
          this.mostrarFormulario = true; // Muestra el formulario
        },
        error: (err) => {
          console.error('Error al obtener el destino:', err);
        }
      });
    } else {
      console.error('ID no válido:', id);
    }
  }

  comprobarDatos(event: Event): void {
    event.preventDefault(); // Prevenir el envío por defecto
    if (this.destinoForm.get('nombre')?.value.trim() !== '') {
      this.mostrarFormulario = true;
    } else {
      alert('Por favor, ingrese un nombre válido para el destino.');
    }
  }

  actualizarDestino(): void {
    if (this.destinoForm.valid) {
      const destinoActualizado = {
        ...this.destinoForm.value,
        id: this.destino.id
      };
      this.destinoService.actualizarDestino(this.destino.id, destinoActualizado).subscribe({
        next: () => {
          this.router.navigate(['/destinos-listar']);
        },
        error: (err) => {
          console.error('Error al actualizar el destino:', err);
        }
      });
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  volver(): void {
    this.router.navigate(['/destino-listar']);
  }
}