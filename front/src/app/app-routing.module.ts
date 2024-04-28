import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsumosComponent } from './components/insumos/insumos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path:'',
    component:InicioComponent
  },
  {
    path:'inicio',
    component:InicioComponent
  },
  {
    path:'insumos',
    component:InsumosComponent
  },
  {
    path:'solicitud',
    component:SolicitudesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
