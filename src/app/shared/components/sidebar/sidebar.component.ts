import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {

  }
  get historial() {
    return this.gifsService.historialEtiquettas;
  }

  obtenerEtiquetaClick(indice: number) {
    return this.gifsService.buscarEtiqueta(this.gifsService.historialEtiquettas[indice])
  }
}
