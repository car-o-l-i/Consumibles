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
  // Declaración de insumoForm
  visible: boolean = false;
  insumoForm = this.fb.group({
    // Inicialización de insumoForm
    departamento: ['', [Validators.required]],
    consumible: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    estado: ['En espera'],
  });
  rol = '';
  dep = '';
  imagenSeleccionada: File | null = null;
  imagenesUrl: string[] = [];

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
    this.insumosService.getProducts().subscribe((data) => {
      this.insumosService.insumos = data;
      console.log(data);
      
      data.forEach(x => {
        this.imagenesUrl.push('');
      });
    });
    this.getDepartamentos();
    console.log(this.dep);
    console.log(this.rol);
  }

  openFilePicker(i: number) {
    const inputElement = document.getElementById(`fileInput_${i}`) as HTMLInputElement;
    if (inputElement) {
      inputElement.click(); // Simula el clic en el input de tipo file
    }
  }
  
  onFileSelected(event: any, i: number) {
    console.log(i);
  
    this.imagenSeleccionada = event.target.files[0] as File;
    if (this.imagenSeleccionada) {
      this.imagenesUrl[i] = URL.createObjectURL(this.imagenSeleccionada); // Crea la URL de la imagen seleccionada
    }

    console.log(i, this.imagenesUrl);
    
  }

  // Métodos get para acceder a los controles del formulario
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
    //console.log(consumible);
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
    console.log(datos);
    this.solicitudService
      .insertarSolicitud(datos as unknown as Solicitud)
      .subscribe(
        (res: any) => {
          const { message, code } = res;
          this.messageService.add({
            severity: 'success',
            summary: 'Registro Exitosos',
            detail: message,
          });
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
}
