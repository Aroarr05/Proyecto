import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../../../services/destino.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-destino-editar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './destino-editar.component.html',
  styleUrls: ['./destino-editar.component.css']
})

export class DestinoEditarComponent implements OnInit {
  destinoForm: FormGroup;
  verifyForm: FormGroup;  
  mostrarFormulario = false;
  destino!: any;

  constructor(
    private fb: FormBuilder,
    private destinoService: DestinoService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
   
    this.verifyForm = this.fb.group({
      nombre: ['', Validators.required],
    });

    this.destinoForm = this.fb.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      lat: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      lng: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(paramMap => {
        const idDestino = paramMap.get('id');  
        if (idDestino && !isNaN(+idDestino)) {
          const validId = +idDestino; 
          return this.destinoService.getDestinoPorId(validId);
        } else {
          throw new Error('ID no válido o no encontrado en la URL');
        }
      })
    ).subscribe({
      next: (data) => {
        this.destino = data;
        this.destinoForm.patchValue({
          nombre: data.nombre,
          ubicacion: data.ubicacion,
          lat: data.coordenadas.lat,
          lng: data.coordenadas.lng,
          imagen: data.imagen
        });
        this.mostrarFormulario = true; 
      },
      error: (err) => {
        console.error('Error al obtener el destino:', err);
        this.router.navigate(['/destino-listar']);  
      }
    });
  }

  comprobarDatos(): void {
    if (this.verifyForm.valid) {
      const nombreDestino = this.verifyForm.get('nombre')?.value;
      console.log('Nombre del destino a comprobar:', nombreDestino);
      this.mostrarFormulario = true; 
    } else {
      alert('Por favor, ingrese el nombre del destino correctamente.');
    }
  }

  actualizarDestino(): void {
    if (this.destinoForm.valid) {
      const destinoActualizado = {
        ...this.destinoForm.value,
        id: this.destino.id,
        coordenadas: {
          lat: this.destinoForm.value.lat,
          lng: this.destinoForm.value.lng
        }
      };

      delete destinoActualizado.lat;
      delete destinoActualizado.lng;
  
      this.destinoService.actualizarDestino(this.destino.id, destinoActualizado).subscribe({
        next: () => {
          this.router.navigate(['/destino-listar']);
        },
        error: (err) => {
          console.error('Error al actualizar el destino:', err);
          alert('Hubo un error al intentar actualizar el destino. Intente nuevamente.');
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
