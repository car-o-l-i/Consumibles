import { Router } from '@angular/router';
import { DepartamentoService } from '../../services/departamento.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  rol='';
  departamento='';
  dep= true;

  constructor(public departamentoService:DepartamentoService, private router:Router){}

  ngOnInit(){
    this.getDepartamentos()
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

  validar(){
    console.log(this.departamento)
    this.dep= this.departamento=='';
  }

  entrar(){
    console.log('fine')
    this.rol="encargado"
    sessionStorage.setItem("rol", this.rol as string)
    sessionStorage.setItem( "departamento", this.departamento as string)
    console.log(this.departamento)
    this.router.navigate(['/insumos'])
  }

  entrarAdm(){
    console.log('fine')
    this.rol="administrador"
    sessionStorage.setItem("rol", this.rol as string)
    sessionStorage.setItem( "departamento", "")
    this.router.navigate(['/insumos'])
  }
}
