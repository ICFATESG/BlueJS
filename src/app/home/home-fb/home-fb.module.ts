import { Workshop } from './workshop.model';
import { NgModule, ɵConsole } from '@angular/core';
import { CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {HomeComponent} from '../home.component'
import { AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
import {Event} from './event.model'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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



  //Re-search with more parameters

    snap_databaseResearch(querry:string){
      this.items = this.angularFire.list(`/${querry}`, { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        
      });
    })
    }

  //Return array of events
    snapdbEventos():Array<Event>{
      let events: any
      events = new Array
      this.items = this.angularFire.list('/Evento', { preserveSnapshot: true });
      this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        let event: any
        event = new Event
        event.id=snapshot.key
        event.nomeEvento=snapshot.val().nomeEvento
        event.localizacaoEvento=snapshot.val().localizacaoEvento
        event.horaInicioEvento=snapshot.val().horaInicioEvento
        event.horaFimEvento=snapshot.val().horaFimEvento
        events.push(event)
      });
    })
      return events

    }
  //Return array of workshops for the event selected
    snapdbWorkshop(eventKey:string): Array<Workshop>{
      let works: any
      works = new Array
      this.items = this.angularFire.list(`/Oficinas/${eventKey}`, { preserveSnapshot: true });
      this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        let work : any
        work = new Workshop
        work.id = snapshot.key
        work.idEvento=snapshot.val().id
        work.local=snapshot.val().local
        work.nomeOficina=snapshot.val().nomeOficina
        work.palestrante=snapshot.val().palestrante
        work.horaInicio=snapshot.val().horaInicio
        work.horaFim=snapshot.val().horaFim
        works.push(work)
      });
    })
    
    return works

    }

//Methods NameOf
    
    getnameOfEvent(key:string): string{
      let o:string=""
      this.items = this.angularFire.list(`/Eventos/${key}`, { preserveSnapshot: true });
      this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        o= snapshot.val().nomeEvento
      });
    })
    return o;
    }
    getnameOfWork(){
      /*let o:string=""
      this.items = this.angularFire.list(`/Eventos/${key}`, { preserveSnapshot: true });
      this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        o= snapshot.val().nomeEvento
      });
    })
    return o;*/
    }
 
  }
