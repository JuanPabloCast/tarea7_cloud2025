export class Register {
  id: number;
  email: string;
  nombre: string;
  birthdate: string;
  password: string;
  genero: string;

  constructor(id: number, email: string, nombre: string, birthdate: string, password: string, genero: string) {
    this.id = id;
    this.email = email;
    this.nombre = nombre;
    this.birthdate = birthdate;
    this.password = password;
    this.genero = genero;
  }
}
