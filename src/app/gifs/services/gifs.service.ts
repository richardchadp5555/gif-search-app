import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historialEtiquetas: string[] = [];

  get historialEtiquettas(){
    return [...this._historialEtiquetas];
  }

  // Agregar nueva etiqueta al array
  buscarEtiqueta(etiqueta: string): void {
    this._historialEtiquetas.unshift(etiqueta);
    console.log(this.historialEtiquettas);
  }

  constructor() { }
}

