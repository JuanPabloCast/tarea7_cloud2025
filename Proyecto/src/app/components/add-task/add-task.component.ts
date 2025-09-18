import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { Task } from '../../models/task/task.model';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  task = {
    titulo: '',
    prioridad: '',
    descripcion: '',
  };

  constructor(private router: Router, private backend: BackendService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const usuarioId = parseInt(localStorage.getItem('usuarioId')!);
      const prioridadFormateada = this.task.prioridad.toUpperCase() as 'ALTA' | 'MEDIA' | 'BAJA';

      const nuevaTarea: Task = new Task(
        0,
        this.task.titulo,
        prioridadFormateada,
        this.task.descripcion,
        '',
        'ACTIVA',
        usuarioId
      );

      this.backend.crearTarea(nuevaTarea).subscribe({
        next: (res) => {
          console.log('Respuesta del backend:', res);
          alert('Tarea agregada correctamente');
          this.router.navigate(['/task-list']);
        },
        error: (err) => {
          console.error('Error al agregar tarea:', err);
          alert('Error al agregar tarea');
        }
      });
    }
  }

}
