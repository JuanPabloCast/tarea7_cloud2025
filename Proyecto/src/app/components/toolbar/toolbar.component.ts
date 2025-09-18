import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  irA(ruta: string) {
    console.log(`Ruta a navegar: ${ruta}`);
    this.router.navigateByUrl(`/${ruta}`);
  }

  logout() {
    localStorage.clear(); // Limpia todo: usuarioId, nombre, token si lo usas más adelante
    this.router.navigate(['/login']);
  }


}
