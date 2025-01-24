import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this.cargarLocalStorage();
  }

  private _historialEtiquetas: string[] = [];
  private apiKey: string = '6MEpVEwIiULkvKClJQBQnEhrbcHy5lrQ';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  public listadoGifs: Gif [] = [];

  private almacenarLocalStorage(): void {
    localStorage.setItem('historial', JSON.stringify(this._historialEtiquetas));
  }
  private cargarLocalStorage(): void {
    if (!localStorage.getItem('historial')) return;
    this._historialEtiquetas = JSON.parse(localStorage.getItem('historial')!)
    if(this._historialEtiquetas.length === 0) return;
    this.buscarEtiqueta(this._historialEtiquetas[0])
  }

  private organizarHistorial(etiqueta: string): void {
    if (this._historialEtiquetas.includes(etiqueta)){ // Si ya está la etiqueta en el historial eliminamos la mas antigua
      let historial_filtrado = this._historialEtiquetas.filter(etiquetaAntigua => (etiquetaAntigua != etiqueta))
      this._historialEtiquetas = historial_filtrado
     }
     if (this._historialEtiquetas.length === 10) {     // Si ya hay 10 elementos se sale
       window.alert("El historial ya tiene 10 elementos, no caben más!")
       return;
     }
     this._historialEtiquetas.unshift(etiqueta);   //Se pone la versión de la etiqueta más nueva como la primera
     this.almacenarLocalStorage()   // Almaceno el localStorage
     console.log(this._historialEtiquetas);
  }
  get historialEtiquettas(){
    return [...this._historialEtiquetas];
  }

  // Agregar nueva etiqueta al array!!
  buscarEtiqueta(etiqueta: string): void {
    etiqueta = etiqueta.toLowerCase().trim();                // Convertimos todo a minúsculas para no distinguir entre minúsculas y máyúsculas
    if (etiqueta.length === 0) return;                   // Si es una cadena vacía no registra la etiqueta
    this.organizarHistorial(etiqueta);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', etiqueta);


    this.http.get<SearchResponse>(`${this.serviceUrl }/search`, { params }).subscribe( resp => {
      this.listadoGifs = resp.data
      console.log({ gifs: this.listadoGifs });
    });
  }


}

