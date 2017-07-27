import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import {FormsModule} from '@angular/forms'
import {HomeComponent} from '../home.component'
@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  providers:[AngularFireDatabase],
  declarations: [HomeComponent]
})
export class HomeFbModule { }
