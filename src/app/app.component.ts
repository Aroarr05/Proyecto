import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, RouterModule, CommonModule],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mi-proyecto';
}
