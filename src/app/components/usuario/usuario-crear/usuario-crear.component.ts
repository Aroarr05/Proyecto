import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';  
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  


@Component({
  selector: 'app-usuario-crear',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})

export class UsuarioCrearComponent {

  usuarioForm: FormGroup;  

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService, 
    private router: Router,
    private http: HttpClient
  ) {
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
  

  agregarUsuario(): void {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;
      const usuarioReestructurado = {
        id: 0, 
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
      };
  
      this.usuarioService.agregarUsuario(usuarioReestructurado).subscribe(() => {
        this.router.navigate(['/usuario-listar']);
      });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
  

  volver(): void {
    this.router.navigate(['/usuario-listar']);
  }
}
