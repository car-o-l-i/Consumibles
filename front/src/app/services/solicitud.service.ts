import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../interfaces/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  URL='http://localhost:3000/solicitud';

  constructor(private http: HttpClient) { }

  solicitud:Solicitud={departamento:'',consumible:'',cantidad:0,estado:'Pendiente'}
  solicitudes:Solicitud[]=[]

  getSolicitudes(){
    return this.http.get<Solicitud[]>(this.URL)
  }

  getSolicitudesByDepartamento(departamento: string){
    const endpoint = `${this.URL}/departamento/${departamento}`;
    return this.http.get<Solicitud[]>(endpoint);
  }

  // Obtener solicitudes por consumible
  getSolicitudesByConsumible(consumible: string){
    const endpoint = `${this.URL}/consumible/${consumible}`;
    return this.http.get<Solicitud[]>(endpoint);
  }

  // Obtener solicitudes por estado
  getSolicitudesByEstado(estado: string){
    const endpoint = `${this.URL}/estado/${estado}`;
    return this.http.get<Solicitud[]>(endpoint);
  }

  // Obtener solicitudes por fecha
  getSolicitudesByFecha(fecha1: Date, fecha2?: Date){
    const endpoint = `${this.URL}/fecha`;
    const body = fecha2 ? { fecha1, fecha2 } : { fecha1 };
    return this.http.post<Solicitud[]>(endpoint, body);
  }

  insertarSolicitud(solicitud: Solicitud) {
    return this.http.post<Solicitud>(this.URL, solicitud);
  }

  actualizarSolicitud(solicitud: Solicitud) {
    return this.http.patch<Solicitud>(this.URL, solicitud);
  }

}
