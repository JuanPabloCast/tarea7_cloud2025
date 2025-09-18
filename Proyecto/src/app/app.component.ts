import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto';
  constructor(private router: Router) {}

  shouldShowToolbar(): boolean {
    const rutasSinToolbar = ['/login', '/register'];
    return !rutasSinToolbar.includes(this.router.url);
  }
}
