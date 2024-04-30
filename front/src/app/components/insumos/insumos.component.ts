import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { insumo } from '../../interfaces/insumo';
import { InsumosService } from './../../services/insumos.service';
import { Component } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/solicitud';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css'],
})
export class InsumosComponent {
  visible: boolean = false;
  insumoForm = this.fb.group({
    departamento: ['', [Validators.required]],
    consumible: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    estado: ['Pendiente'],
  });
  rol = '';
  dep = '';
  imagenSeleccionada: File | null = null;
  imagenesUrl: string[] = [];
  mostrarLista: boolean = false; // Nueva propiedad para controlar la visibilidad de la lista
  listaInsumos: insumo[] = [];

  constructor(
    public insumosService: InsumosService,
    private fb: FormBuilder,
    public departamentoService: DepartamentoService,
    public solicitudService: SolicitudService,
    private messageService: MessageService
  ) {
    this.rol = sessionStorage.getItem('rol') || '';
    this.dep = sessionStorage.getItem('departamento') || '';
  }

  ngOnInit() {
    this.insumosService.getProducts().subscribe((data: insumo[]) => {
      this.insumosService.insumos = data;
      this.listaInsumos = data;
      data.forEach((x) => {
        this.imagenesUrl.push('');
      });
    });

    if (this.dep != '') {
      this.solicitudService
        .getSolicitudesByDepartamento(this.dep)
        .subscribe((data) => {
          this.solicitudService.solicitudes = data;
          data.forEach((x) => {
            this.imagenesUrl.push('');
          });
        });
    }

    this.getDepartamentos();
  }

  openFilePicker(i: number) {
    const inputElement = document.getElementById(
      `fileInput_${i}`
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  }

  onFileSelected(event: any, i: number) {
    this.imagenSeleccionada = event.target.files[0] as File;
    if (this.imagenSeleccionada) {
      this.imagenesUrl[i] = URL.createObjectURL(this.imagenSeleccionada);
    }
  }

  get departamento() {
    return this.insumoForm.get('departamento');
  }

  get consumible() {
    return this.insumoForm.get('consumible');
  }

  get cantidad() {
    return this.insumoForm.get('cantidad');
  }

  getSeverity(insumo: insumo) {
    if (insumo.cantidad_disponible >= 50) {
      return 'success';
    } else if (insumo.cantidad_disponible >= 20) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  nombre = '';

  showDialog(consumible: string) {
    this.nombre = consumible;
    this.visible = true;
  }

  getDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe(
      (data) => {
        this.departamentoService.departamentos = data;
      },
      (error) => {
        console.error('Error al obtener las solicitudes:', error);
      }
    );
  }

  enviarSolicitud() {
    const datos = { ...this.insumoForm.value };
    this.solicitudService
      .insertarSolicitud(datos as unknown as Solicitud)
      .subscribe(
        (res: any) => {
          const { message, code } = res;
          this.messageService.add({
            severity: 'success',
            summary: 'Registro Exitoso',
            detail: message,
          });

          if (datos.departamento !== null && datos.departamento !== undefined) {
            const solicitud: Solicitud = {
              ...datos,
              consumible: datos.consumible!,
              cantidad: parseInt(datos.cantidad!),
              estado: 'Pendiente',
              departamento: datos.departamento!,
            };
            if (!this.insumosService.solicitudes) {
              this.insumosService.solicitudes = [solicitud];
            } else {
              this.insumosService.solicitudes.push(solicitud);
            }
          } else {
            console.error('El departamento no es válido.');
            return;
          }

          this.insumoForm.reset();
          this.visible = false;
        },
        (error: any) => {
          let errorMessage = 'Hubo un error en el registro';
          if (error && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Error en el registro',
            detail: errorMessage,
          });
        }
      );
  }

  // Método para mostrar la lista de consumibles solicitados
  mostrarListaSolicitados() {
    this.mostrarLista = true;
    console.log(this.solicitudService.solicitudes);
  }

  filtrarNombre(event: any) {
    let inputText = (event.target as HTMLInputElement).value;
    if (inputText.trim() === '') {
      this.listaInsumos = this.insumosService.insumos;
    } else {
      this.listaInsumos = this.insumosService.insumos.filter((insumo) =>
        insumo.nombre.toLowerCase().includes(inputText.trim().toLowerCase())
      );
    }
  }
}
