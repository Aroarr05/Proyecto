import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';  // Asegúrate de tener un servicio de usuario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-editar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {
  usuarioForm: FormGroup;
  verifyForm: FormGroup;  
  mostrarFormulario = false;
  usuario!: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    // Formulario de verificación de datos (en este caso, solo nombre)
    this.verifyForm = this.fb.group({
      nombre: ['', Validators.required],
    });

    // Formulario principal de usuario
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }; 
    }
    return null;
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(paramMap => {
        const idUsuario = paramMap.get('id');
        if (idUsuario && !isNaN(+idUsuario)) {
          const validId = +idUsuario; 
          return this.usuarioService.getUsuarioPorId(validId);
        } else {
          throw new Error('ID no válido o no encontrado en la URL');
        }
      })
    ).subscribe({
      next: (data) => {
        this.usuario = data;
        this.usuarioForm.patchValue({
          nombre: data.nombre,
          email: data.email,
          password: '',
          confirmPassword: ''
        });
        this.mostrarFormulario = true;
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        this.router.navigate(['/usuario-listar']);
      }
    });
  }

  comprobarDatos(): void {
    if (this.verifyForm.valid) {
      const nombreUsuario = this.verifyForm.get('nombre')?.value;
      console.log('Nombre del usuario a comprobar:', nombreUsuario);
      this.mostrarFormulario = true;
    } else {
      alert('Por favor, ingrese el nombre del usuario correctamente.');
    }
  }

  actualizarUsuario(): void {
    if (this.usuarioForm.valid) {
      const usuarioActualizado = {
        ...this.usuarioForm.value,
        id: this.usuario.id 
      };

      if (!usuarioActualizado.password) {
        delete usuarioActualizado.password;
      }

      this.usuarioService.actualizarUsuario(this.usuario.id, usuarioActualizado).subscribe({
        next: () => {
          this.router.navigate(['/usuario-listar']);
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
          alert('Hubo un error al intentar actualizar el usuario. Intente nuevamente.');
        }
      });
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
  
  passwordVisible: boolean = false;  
  confirmPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; 
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;  
  }

  volver(): void {
    this.router.navigate(['/usuario-listar']);
  }
}
