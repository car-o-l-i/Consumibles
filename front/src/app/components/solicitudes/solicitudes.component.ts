import { InsumosService } from './../../services/insumos.service';
import { Departamento } from './../../interfaces/departamento';
import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../interfaces/solicitud';
import { SolicitudService } from '../../services/solicitud.service';
import { DepartamentoService } from '../../services/departamento.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  consumible:string='';
  estado:string='';
  rol=''
  departamento=''

  constructor(
    private solicitudService: SolicitudService, 
    public departamentoService:DepartamentoService,
    public insumosService: InsumosService,
    private messageService:MessageService
  ) { 
    
  }

  ngOnInit(): void {
    // Llamar al método para obtener todas las solicitudes
    this.getSolicitudes();
    this.getDepartamentos();
    this.getConsumibles();
  }

  getSolicitudes(){
    this.solicitudService.getSolicitudes().subscribe(
      (data: Solicitud[]) => {
        this.solicitudes = data;
      },
      (error) => {
        console.error('Error al obtener las solicitudes:', error);
      }
    );
    this.resetSelects();
  }

  // Obtener solicitudes por departamento
  getSolicitudesByDepartamento(departamento: string){
    this.solicitudService.getSolicitudesByDepartamento(departamento).subscribe(
      (data) => {
        this.solicitudes = data;
      },
      (error) => {
        console.error('Error al obtener las solicitudes por departamento:', error);
      }
    );
    this.resetSelects();
  }

  // Obtener solicitudes por consumible
  getSolicitudesByConsumible(consumible: string){
    this.solicitudService.getSolicitudesByConsumible(consumible).subscribe(
      (data: Solicitud[]) => {
        this.solicitudes = data;
      },
      (error) => {
        console.error('Error al obtener las solicitudes por consumible:', error);
      }
    );
    this.resetSelects();
  }

  // Obtener solicitudes por estado
  getSolicitudesByEstado(estado: string | null){
    if (estado !== null) {
      this.solicitudService.getSolicitudesByEstado(estado).subscribe(
        (data: Solicitud[]) => {
          this.solicitudes = data;
        },
        (error) => {
          console.error('Error al obtener las solicitudes por estado:', error);
        }
      );
    }
    this.resetSelects();
  }

  // Obtener solicitudes por rango de fecha
  getSolicitudesByFecha(fecha1: Date, fecha2: Date): void {
    this.solicitudService.getSolicitudesByFecha(fecha1, fecha2).subscribe(
      (data: Solicitud[]) => {
        this.solicitudes = data;
      },
      (error) => {
        console.error('Error al obtener las solicitudes por rango de fecha:', error);
      }
    );
    this.resetSelects();
  }

  getDepartamentos(){
    this.departamentoService.getDepartamentos().subscribe(
      (data) => {
        this.departamentoService.departamentos = data;
      },
      (error) => {
        console.error('Error al obtener las solicitudes:', error);
      }
    );
  }

  getConsumibles(){
    this.insumosService.getProducts().subscribe(
      (data) => {
        this.insumosService.insumos = data;
      }
    );
  }

  resetSelects(): void {
    this.departamento = '';
    this.consumible = '';
    this.estado = '';
  }

  aceptarSolicitud(solicitud: any) {
    solicitud.estado = "Aceptado"
    console.log(solicitud);
    
    this.solicitudService.actualizarSolicitud(solicitud as unknown as Solicitud).subscribe(
      (res:any)=>{
        const {message,code}=res
        this.messageService.add({ 
        severity: 'success', 
        summary: 'Actualizacion Exitosa', 
        detail: message });
      },
      (error:any)=>{
        let errorMessage = 'Hubo un error en el registro';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error en el registro', 
          detail: errorMessage
        });
      }
      )
    
  }

  rechazarSolicitud(solicitud: any) {
    solicitud.estado = "Rechazado"
    console.log(solicitud);

    this.solicitudService.actualizarSolicitud(solicitud as unknown as Solicitud).subscribe(
      (res:any)=>{
        const {message,code}=res
        this.messageService.add({ 
        severity: 'success', 
        summary: 'Actualizacion Exitosa', 
        detail: message });
      },
      (error:any)=>{
        let errorMessage = 'Hubo un error en el registro';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error en el registro', 
          detail: errorMessage
        });
      }
      )
  }

}
