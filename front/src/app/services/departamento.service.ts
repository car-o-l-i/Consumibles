import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from '../interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  URL='http://localhost:3000/departamento';

  constructor(private http: HttpClient) { }

  departamento:Departamento={nombre:''}
  departamentos:Departamento[]=[]

  getDepartamentos(){
    return this.http.get<Departamento[]>(this.URL)
  }
}
