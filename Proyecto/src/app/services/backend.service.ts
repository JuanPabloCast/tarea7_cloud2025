import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register/register.model';
import { RegistroResponse } from '../models/register/register-response.model';
import { Login } from '../models/login/login.model';
import { LoginResponse } from '../models/login/login-response.model';
import { Task } from '../models/task/task.model';
import { TaskResponse } from '../models/task/task-rencponce.model';

const DOMINIO = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }
  // ----------------------------------------------------------------------------------

  // Todo login/register
  // Registrar usuario
  grabarUsuario(register: Register) {
    let headers = this.getHeaders();
    return this.http.post<RegistroResponse>(`${DOMINIO}/usuarios/register`, register, { headers });
  }

  // Loggear usuario
  loginUsuario(login: Login) {
    const headers = this.getHeaders();
    return this.http.post<LoginResponse>(`${DOMINIO}/usuarios/login`, login, { headers });
  }

  // Obtener usuarios para poder loguearse
  obtenerUsuarios() {
    let headers = this.getHeaders();
    return this.http.get<RegistroResponse>(`${DOMINIO}/usuarios`, { headers });
  }

// ----------------------------------------------------------------------------------

  // Todo tareas

  // Obtener tareas por id de usuario

  obtenerTareas(usuario_id: number, status: 'ACTIVA' | 'FINALIZADA' = 'ACTIVA') {
    let headers = this.getHeaders();
    return this.http.get<TaskResponse>(`${DOMINIO}/tareas/${usuario_id}/${status}`, { headers });
  }

  // Crear tarea
  crearTarea(task: Task) {
    let headers = this.getHeaders();
    return this.http.post<TaskResponse>(`${DOMINIO}/tareas`, task,  { headers });
  }

  // Actualizar tarea
  actualizarTarea(task: Task) {
    let headers = this.getHeaders();
    return this.http.put<TaskResponse>(`${DOMINIO}/tareas/${task.id}`, task, { headers });
  }

  marcarTareaFinalizada(id: number) {
    let headers = this.getHeaders();
    return this.http.put(`${DOMINIO}/tareas/${id}/finalizar`, {}, { headers });
  }

  /* // Eliminar tarea
  eliminarTarea(id: number) {
    let headers = this.getHeaders();
    return this.http.delete<TaskResponse>(`${DOMINIO}/tareas/${id}`, { headers });
  } 
  */
  // ----------------------------------------------------------------------------------

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
}
