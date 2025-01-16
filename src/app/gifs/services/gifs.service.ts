import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historialEtiquetas: string[] = [];
  private apiKey: string = '6MEpVEwIiULkvKClJQBQnEhrbcHy5lrQ';
  get historialEtiquettas(){
    return [...this._historialEtiquetas];
  }

  // Agregar nueva etiqueta al array
  buscarEtiqueta(etiqueta: string): void {
    etiqueta = etiqueta.toLowerCase();                // Convertimos todo a minúsculas para no distinguir entre minúsculas y máyúsculas
    if (this._historialEtiquetas.includes(etiqueta)){ // Si ya está la etiqueta en el historial eliminamos la mas antigua
     let historial_filtrado = this._historialEtiquetas.filter(etiquetaAntigua => (etiquetaAntigua != etiqueta))
     this._historialEtiquetas = historial_filtrado
    }
    if (this._historialEtiquetas.length === 10) {     // Si ya hay 10 elementos se sale
      window.alert("El historial ya tiene 10 elementos, no caben más!")
      return;
    }
    this._historialEtiquetas.unshift(etiqueta);   //Se pone la versión de la etiqueta más nueva como la primera
    console.log(this.historialEtiquettas);
  }

  constructor() { }
}

