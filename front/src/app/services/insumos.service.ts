import { Injectable } from '@angular/core';
import { insumo } from '../interfaces/insumo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  guardarInsumo(value: Partial<{ departamento: string | null; consumible: string | null; cantidad: string | null; estado: string | null; imagen: string | null; }>, imagenSeleccionada: File | null) {
    throw new Error('Method not implemented.');
  
  }

  URL='http://localhost:3000/consumible';

  constructor(private http: HttpClient) { }

  insumo:insumo={nombre:'',cantidad_disponible:0,image:''}
  insumos:insumo[]=[];

  getProducts(){
    return this.http.get<insumo[]>(this.URL)
  }

  

}
