export class Task {
  id: number;
  titulo: string;
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA'; 
  descripcion: string;
  fecha_creacion: string;
  status: 'ACTIVA' | 'FINALIZADA';
  usuario_id: number;

  constructor(id: number,titulo: string, prioridad: 'ALTA' | 'MEDIA' | 'BAJA', descripcion: string, fecha_creacion: string, status: 'ACTIVA' | 'FINALIZADA',
    usuario_id: number ) {
    this.id = id;
    this.titulo = titulo;
    this.prioridad = prioridad;
    this.descripcion = descripcion;
    this.fecha_creacion = fecha_creacion;
    this.status = status;
    this.usuario_id = usuario_id;
  }
}
