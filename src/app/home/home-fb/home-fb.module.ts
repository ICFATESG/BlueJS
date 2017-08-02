import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {HomeComponent} from '../home.component'
import { AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
import {Event} from './event.model'
@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  providers:[AngularFireDatabase],
  declarations: [HomeComponent]
})
export class HomeFbModule {
  srtSearch: string=""
  GLOBALWORKSHOPKEY:string="";
  GLOBALEVENTKEY:string="";
  items: FirebaseListObservable<any>;
  subItem:FirebaseListObservable<any>;
  temp:Array<object>;
  constructor(private angularFire: AngularFireDatabase){}

//-----------------METHODS--------------------
getEvent(str:string){
this.GLOBALEVENTKEY=str
}

getWorkshop(str:string){
this.GLOBALWORKSHOPKEY=str
}

//Send a name of event and name of workshop to the DB --NOT USEFUL-- --SAMPLE--
  form_submit(eventAt: string,workshopAt: string) {
  this.angularFire.list("").push(
  {
  event: eventAt,
  workshop:workshopAt
  }
  ).then((t: any) => console.log('dados gravados: ' + t.key)),
  (e: any) => console.log(e.message);
}


//return FirebaseListObservable Type  of snapshot of users
 snap_databaseUser(){
  this.items = this.angularFire.list('/Usuarios', { preserveSnapshot: true });
this.items.subscribe(snapshots => {
  snapshots.forEach(snapshot => {
    console.log(snapshot.key)
    console.log(snapshot.val().bluetoothMAC)

  });
})
}

//return FirebaseListObservable Type  of snapshot of workshops

snap_databaseWorkshop(){
  this.items = this.angularFire.list('/Oficinas', { preserveSnapshot: true });
this.items.subscribe(snapshots => {
  snapshots.forEach(snapshot => {
    //console.log(snapshot.key)
    this.srtSearch=`Oficinas/${snapshot.key}`
    this.snap_databaseResearch(this.srtSearch)
  });
})
}


//Re-search with more parameters

snap_databaseResearch(querry:string){
  this.items = this.angularFire.list(`/${querry}`, { preserveSnapshot: true });
this.items.subscribe(snapshots => {
  snapshots.forEach(snapshot => {
    console.log(snapshot.val().nomeOficina)
  });
})
}



snapdbEventos():Event[]{
  let events:Event[]
  this.items = this.angularFire.list('/Evento', { preserveSnapshot: true });
this.items.subscribe(snapshots => {
  snapshots.forEach(snapshot => {
    let event:Event
    event.id=snapshot.key
    event.nomeEvento=snapshot.val().nomeEvento
    event.localizacaoEvento=snapshot.val().localizacaoEvento
    event.horaInicioEvento=snapshot.val().horaInicioEvento
    event.horaFimEvento=snapshot.val().horaFimEvento
    events.push(event)
  });
})
console.log(events)
return events
}


 }
