import { Component } from '@angular/core';
import { Destino } from '../../../models/destino.model';
import { DestinoService } from '../../../services/destino.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-destino-crear',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone:true,
  templateUrl: './destino-crear.component.html',
  styleUrl: './destino-crear.component.css'
})
export class DestinoCrearComponent {

  destino!: Destino ;

  constructor(private destinoService: DestinoService, private router: Router){}
 
  agregarDestino(): void{
    if(this.destino) {
      this.destinoService.agregarDestino(this.destino).subscribe(() => {
        this.router.navigate(['/destinos-listar']);
      });
    }
  }

}
