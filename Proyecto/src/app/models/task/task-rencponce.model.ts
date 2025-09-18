import { Task } from "./task.model";

export class TaskResponse {
  status: number;
  mensaje: string;
  data: Task[] | null;

  constructor(status: number, message: string, data: Task[] | null) {
    this.status = status;
    this.mensaje = message;
    this.data = data;
  }
}
