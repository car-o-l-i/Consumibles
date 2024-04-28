import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { InsumosComponent } from './components/insumos/insumos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { RegistroSolicitudComponent } from './components/registro-solicitud/registro-solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
// import { GoogleApiService, NgGapiClientConfig, NG_GAPI_CONFIG } from 'ng-gapi';

@NgModule({
  declarations: [
    AppComponent,
    InsumosComponent,
    SolicitudesComponent,
    RegistroSolicitudComponent,
    InicioComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    MessageService,
    /*GoogleApiService,
    {
      provide: NG_GAPI_CONFIG,
      useValue: {
        apiKey: 'TU_API_KEY',
        clientId: 'TU_CLIENT_ID',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: 'https://www.googleapis.com/auth/drive.file',
      } as NgGapiClientConfig,
    },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
