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
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ServiceComponent,
    AngularFireDatabase,
    FirebaseObjectObservable,
    FirebaseListObservable
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    RouterModule.forRoot(ROUTES,{preloadingStrategy:PreloadAllModules})
  ],
  providers: [AppComponent,AngularFireModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
