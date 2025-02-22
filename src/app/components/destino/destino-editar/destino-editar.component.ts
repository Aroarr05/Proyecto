import { Component } from '@angular/core';
import { DestinoService } from '../../../services/destino.service';
import { Destino } from '../../../models/destino.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-destino-editar',
  imports: [FormsModule],
  templateUrl: './destino-editar.component.html',
  styleUrl: './destino-editar.component.css'
})
export class DestinoEditarComponent {

   destino!: Destino ;

  constructor(private route: ActivatedRoute, private destinoService: DestinoService, private router: Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.destinoService.getDestinoPorId(+id).subscribe(data => {
        this.destino = data;
      });
    }
  }

  actualizarDestino(): void {
    this.destinoService.actualizarDestino(this.destino.id, this.destino).subscribe(()=>{
      this.router.navigate(['/destinos-listar']);
    })
  }
}
