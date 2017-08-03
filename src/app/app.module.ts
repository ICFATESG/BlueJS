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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    RouterModule.forRoot(ROUTES,{preloadingStrategy:PreloadAllModules})
  ],
  providers: [AngularFireModule,AngularFireDatabase,HomeFbModule,Event],
  bootstrap: [AppComponent]
})
export class AppModule { }
