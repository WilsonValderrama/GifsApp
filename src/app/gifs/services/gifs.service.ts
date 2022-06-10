import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey:string = 'ooCtHrAgJi7RSXXxiXSkDR2mPAfzcfsX';
  private servicioUrl:string ='http://api.giphy.com/v1/gifs';
  private _historial:string[] = [];

  //todo:Cambiar any por su tipo
  public resultados:Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  //INYECTAR API
  constructor(private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!)||[];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)||[];

  }


  buscarGifs(query:string = ''){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,20);
      //GRABAR EN EL LOCALSTORAGE
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apikey)
          .set('limit','20')
          .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe( (resp) =>{
      this.resultados = resp.data;
      //GRABAR EN EL LOCALSTORAGE
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    } )


  }




}
