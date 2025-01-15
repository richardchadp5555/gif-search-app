import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @ViewChild('txtInputEtiqueta') inputEtiqueta!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscarEtiqueta() {
    const nuevaEtiqueta = this.inputEtiqueta.nativeElement.value;

    // Llama al servicio para registrar la nueva etiqueta
    this.gifsService.buscarEtiqueta(nuevaEtiqueta);

    // Limpia el campo de búsqueda
    this.inputEtiqueta.nativeElement.value = '';
  }
}
