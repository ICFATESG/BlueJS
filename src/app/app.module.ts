import { Oficina } from './oficinas/oficinas.model';
import { Usuario } from './usuario/usuario.model';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {ROUTES} from './app.routs';
import { HeaderComponent } from './header/header.component';
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';
import { ServiceComponent } from './service/service.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomeFbModule} from './home/home-fb/home-fb.module'
import { Event} from './home/home-fb/event.model'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http';
import { MacComponent } from './mac/mac.component'
import { MacsComponent } from './mac/macs.component'
import { MacService } from './mac/mac.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { OficinasComponent } from './oficinas/oficinas.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ServiceComponent,
    MacComponent,
    UsuarioComponent,
    OficinasComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    RouterModule.forRoot(ROUTES,{preloadingStrategy:PreloadAllModules})
  ],
  providers: [Oficina,Usuario,MacService,AngularFireModule, AngularFireDatabase, HomeFbModule, Event, ServiceComponent, MacsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
