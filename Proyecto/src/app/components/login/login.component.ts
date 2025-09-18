// imports para  el funcionamiendo del login.
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Login } from '../../models/login/login.model';	
import { LoginResponse } from '../../models/login/login-response.model';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';

//Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = {
    email: '',
    password: ''
  };

  loginValido: boolean = true;

  constructor(private backend: BackendService, private router: Router) {}

  onSubmit(form: any): void {
    if (form.valid) {
      const loginData: Login = new Login(this.usuario.email, this.usuario.password);
      this.backend.loginUsuario(loginData).subscribe({
        next: (res: LoginResponse) => {
          this.loginValido = true;
          if (res.usuario) {
            localStorage.setItem('usuarioId', res.usuario.id.toString());
            localStorage.setItem('usuarioNombre', res.usuario.nombre);
            //alert('Inicio de sesión exitoso');
            this.router.navigate(['/add-task']);
            console.log('Respuesta del backend:', res);
          } else {
            alert('Error: datos de usuario no recibidos');
          }
        },
        error: (err) => {
          this.loginValido = false;
          console.error('Error de login:', err);
        }
      });
    }
  }

}
