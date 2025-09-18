export class Usuario {
  id: number;
  email: string;
  nombre: string;

  constructor(id: number, email: string, nombre: string) {
    this.id = id;
    this.email = email;
    this.nombre = nombre;
  }
}
