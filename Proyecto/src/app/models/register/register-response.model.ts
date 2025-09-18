import { Register } from "./register.model";

export class RegistroResponse {
  status: number;
  mensaje: string;
  data: Register[] | null;

  constructor(status: number, message: string, data: Register[] | null) {
    this.status = status;
    this.mensaje = message;
    this.data = data;
  }
}
