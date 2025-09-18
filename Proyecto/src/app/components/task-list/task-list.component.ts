import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Task } from '../../models/task/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = []; 

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    const usuarioId = parseInt(localStorage.getItem('usuarioId')!);
    this.backend.obtenerTareas(usuarioId, 'ACTIVA').subscribe(res => {
      console.log('Tareas recibidas:', this.tasks);
      if (res.status === 0 && res.data != null) {
        this.tasks = res.data;
      }
    });
  }

  getPriorityClass(prioridad: string): string {
    switch (prioridad.toUpperCase()) {
      case 'ALTA': return 'prioridad-alta';
      case 'MEDIA': return 'prioridad-media';
      case 'BAJA': return 'prioridad-baja';
      default: return '';
    }
  }

  tiempoDesdeCreacion(fecha: string): string {
    const fechaCreacion = new Date(fecha);
    const ahora = new Date();
    const diferenciaMs = ahora.getTime() - fechaCreacion.getTime();

    const minutos = Math.floor(diferenciaMs / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) return `${dias} día(s)`;
    if (horas > 0) return `${horas} hora(s)`;
    return `${minutos} minuto(s)`;
  }

  completarTarea(task: Task) {
    const confirmado = confirm(`¿Deseas marcar la tarea "${task.titulo}" como finalizada?`);
    if (confirmado) {
      this.backend.marcarTareaFinalizada(task.id).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      });
    }
  }

}
