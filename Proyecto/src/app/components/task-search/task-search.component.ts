import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task/task.model';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-search',
  imports: [CommonModule, MatButtonModule, FormsModule],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.css'
})
export class TaskSearchComponent implements OnInit {

  tareasOriginales: Task[] = [];
  tareasFiltradas: Task[] = [];

  busqueda: string = '';
  ordenAscendente: boolean = true;
  prioridadSeleccionada: 'ALTA' | 'MEDIA' | 'BAJA' | 'TODAS' = 'TODAS';

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    const usuarioId = parseInt(localStorage.getItem('usuarioId')!);
    this.backend.obtenerTareas(usuarioId, 'ACTIVA').subscribe(res => {
      if (res.status === 0 && res.data != null) {
        this.tareasOriginales = res.data;
        this.filtrarTareas();
      }
    });
  }

  filtrarTareas() {
    const texto = this.busqueda.toLowerCase();

    this.tareasFiltradas = this.tareasOriginales
      .filter(t => {
        const coincideTexto =
          t.titulo.toLowerCase().includes(texto) ||
          t.descripcion.toLowerCase().includes(texto);

        const coincidePrioridad =
          this.prioridadSeleccionada === 'TODAS' || t.prioridad === this.prioridadSeleccionada;

        return coincideTexto && coincidePrioridad;
      })
      .sort((a, b) => {
        const fechaA = new Date(a.fecha_creacion).getTime();
        const fechaB = new Date(b.fecha_creacion).getTime();
        return this.ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
      });
  }

  alternarOrden() {
    this.ordenAscendente = !this.ordenAscendente;
    this.filtrarTareas();
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

}
