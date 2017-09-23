import { Oficina } from '../../oficinas/oficinas.model';
import { Usuario } from '../../usuario/usuario.model';
import { Workshop } from './workshop.model';
import { NgModule, ɵConsole} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HomeComponent } from '../home.component'
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Event } from './event.model'
import { Observable } from 'rxjs/Observable'
import { Subscriber } from "rxjs/Subscriber";
import { Operator } from "rxjs/Operator";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  providers: [AngularFireDatabase],
  declarations: [HomeComponent]
})
export class HomeFbModule {
  hEntrada:string
  hSaida:string
  a:boolean
  srtSearch: string = ""
  GLOBALWORKSHOPKEY: string = "";
  GLOBALEVENTKEY: string = "";
  items: FirebaseListObservable<any>;
  subItem: FirebaseListObservable<any>;
  temp: Array<object>;
  constructor(private oficinas: Oficina, private usr: Usuario, private angularFire: AngularFireDatabase) { 
  }

  //-----------------METHODS--------------------

  //Send a name of event and name of workshop to the DB --NOT USEFUL-- --SAMPLE--
  form_submit(eventAt: string, workshopAt: string) {
    this.angularFire.list("").push(
      {
        event: eventAt,
        workshop: workshopAt
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);
  }


  //return FirebaseListObservable Type  of snapshot of users
  snap_databaseUser() {
    this.items = this.angularFire.list('/Usuarios', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.key)
        console.log(snapshot.val().bluetoothMAC)

      });
    })
  }


  //Return key o the mac user
  getUserKeyMAC(MAC: string): FirebaseListObservable<any> {
    let key: string = ""
    let oMAC: string = ""
    let rt: any;
    let us: any;
    oMAC = MAC
    this.items = this.angularFire.list('/Usuarios', { preserveSnapshot: true });
    us = new Usuario
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        let arrayTemp: any
        let aMAC: string = ""
        aMAC = snapshot.val().bluetoothMAC
        if (aMAC === oMAC) {
          us.$id = snapshot.key
          us.$nome = snapshot.val().nome;
          us.$cpf = snapshot.val().cpf;
          us.$bluetoothMAC = snapshot.val().bluetoothMAC;
          arrayTemp = new Array;
          arrayTemp = snapshot.val().oficinaVisitadas
          us.$oficinaVisitadas = arrayTemp
        }
      });
    })
    return this.items
  }


  metodoteste(q: string) {
    q += "/" + this.GLOBALEVENTKEY
    this.items = this.angularFire.list(`/Usuarios/${q}`, { preserveSnapshot: true });
    this.items.subscribe(snapshot => {
      if (snapshot.length > 0) {
        snapshot.forEach(
          obj => {
            console.log(obj.val());

          }
        )
      }
    })
  }
  //Re-search with more parameters

  snap_databaseResearch(querry: string) {
    this.items = this.angularFire.list(`/${querry}`, { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {

      });
    })
  }

  //Return array of events
  snapdbEventos(): Array<Event> {
    let events: any
    events = new Array
    this.items = this.angularFire.list('/Evento', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        let event: any
        event = new Event
        event.id = snapshot.key
        event.nomeEvento = snapshot.val().nomeEvento
        event.localizacaoEvento = snapshot.val().localizacaoEvento
        event.horaInicioEvento = snapshot.val().horaInicioEvento
        event.horaFimEvento = snapshot.val().horaFimEvento
        events.push(event)
      });
    })
    return events

  }
  //Return array of workshops for the event selected
  snapdbWorkshop(): Array<Workshop> {
    let works: any
    works = new Array
    this.items = this.angularFire.list(`/Oficinas/${this.GLOBALEVENTKEY}`, { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        let work: any
        work = new Workshop
        work.id = snapshot.key
        work.idEvento = snapshot.val().id
        work.local = snapshot.val().local
        work.nomeOficina = snapshot.val().nomeOficina
        work.palestrante = snapshot.val().palestrante
        work.horaInicio = snapshot.val().horaInicio
        work.horaFim = snapshot.val().horaFim

        works.push(work)
      });
    })

    return works

  }

//Methods NameOf

  getnameOfEvent(): string {
    let o: string
    this.items = this.angularFire.list('/Evento', { preserveSnapshot: true })
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.key == this.GLOBALEVENTKEY) { o = snapshot.val().nomeEvento;}
      });

    })
    return o

  }
  getnameOfWork(): string {
    let o: string
    this.items = this.angularFire.list(`/Oficinas/${this.GLOBALEVENTKEY}`, { preserveSnapshot: true })
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.key == this.GLOBALWORKSHOPKEY) { o = snapshot.val().nomeOficina; this.hEntrada = snapshot.val().horaInicio; this.hSaida = snapshot.val().horaFim }
      });

    })
    return o

  }

  getMajor(s:boolean){
    this.a=s
  }

  majorEntrada(usrk: string, workshpName: string, eventName: string, macADD: string){
    this.items = this.angularFire.list(`/Usuarios/${usrk}/${this.GLOBALEVENTKEY}/${this.GLOBALWORKSHOPKEY}`);
    this.items.subscribe(snapshot=>{ 
      console.log(snapshot.length);
        if(snapshot.length > 1){
          console.log('Existe')
          this.getMajor(true)
        }else if(snapshot.length < 1){
          console.log('Não Existe')
          this.entradaSET(usrk,workshpName,eventName,macADD)
          this.getMajor(false)
        }
    })
  }
  //Control of time entrance and exit of workshop

  entradaSET(usrk: string, workshpName: string, eventName: string, macADD: string) {
    let u: boolean
    u = this.dentroDoPrazo(this.hEntrada)
    if (u == true) {
    const itemObservable = this.angularFire.object(`/Usuarios/${usrk}/${this.GLOBALEVENTKEY}/${this.GLOBALWORKSHOPKEY}`);
    itemObservable.update({
      horaEntrada: this.horario(),
      idoficina: this.GLOBALWORKSHOPKEY,
      mac: macADD,
      nomeEvento: eventName,
      nomeOficina: workshpName
    });
    } else {
      alert('Conflito de horarios,favor atualizar a pagina e escolher uma oficina com horario compativel!')
    }
  }

  saidaSET(usrk: string) {
    let u:boolean
    u=this.dentroDoPrazo(this.hSaida)
    if(u == true){
    const itemObservable = this.angularFire.object(`/Usuarios/${usrk}/${this.GLOBALEVENTKEY}/${this.GLOBALWORKSHOPKEY}`);
    let dt: Date
    dt = new Date()
    itemObservable.update({
      horaSaida: this.horario(),
    });
    }else{
      alert('Conflito de horarios,favor atualizar a pagina e escolher uma oficina com horario compativel!')
    }
  }


  //get Data of user of CACHE list,and return key for saidaSET
  constSaida(mac:String){
    let resultObservableS : FirebaseListObservable <any>
    resultObservableS = this.getUserKeyMAC(String(mac));
    resultObservableS.subscribe((usr)=>{
      usr.forEach(u => {
        this.saidaSET(u.key)
      });
      
    })
  }
  //format time
  horario():string {
    let dt:Date;dt=new Date();
    let h;let m;let s;
    if (dt.getHours() < 10) { h = '0' + dt.getHours() } else { h = dt.getHours() }
    if (dt.getMinutes() < 10) { m = '0' + dt.getMinutes() } else { m = dt.getMinutes() }
    if (dt.getSeconds() < 10) { s = '0' + dt.getSeconds() } else { s = dt.getSeconds() }
    return h+':'+m+':'+s
  }
  dentroDoPrazo(dat:string):boolean{
    let b:boolean
    let datDB = `1968-11-16T${dat}:00`
    let s:string
    s=this.horario()
    let BD = new Date(`1968-11-16T${dat}`);
    let newDate2 = new Date();
    if (BD.getHours() <= newDate2.getHours()) {
      b=true
    } else {
      b=false
    } 
    return b
  }
}
 