import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { Register } from '../../models/register/register.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user = {
    email: '',
    nombre: '',
    birthdate: '',
    password: '',
    genero: ''
  };
  ngOnInit(): void {
  }

  constructor(private router: Router, private backend: BackendService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const nuevoUsuario: Register = new Register(
        0,
        this.user.email,
        this.user.nombre,
        this.user.birthdate,
        this.user.password,
        this.user.genero
      );
      
      this.backend.grabarUsuario(nuevoUsuario).subscribe({
        next: (res) => {
          console.log('Respuesta del backend:', res);
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 409) {
            alert('El email ya está registrado');
          } else {
            alert('Error al registrar usuario');
          }
        }
      });

    }
  }

}
