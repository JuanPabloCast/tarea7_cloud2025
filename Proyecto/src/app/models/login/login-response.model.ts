import { Usuario } from "../usuario/usuario.model";

export class LoginResponse {
  status: number;
  mensaje: string;
  usuario: Usuario | null;

  constructor(status: number, mensaje: string, usuario: Usuario | null) {
    this.status = status;
    this.mensaje = mensaje;
    this.usuario = usuario;
  }
}
