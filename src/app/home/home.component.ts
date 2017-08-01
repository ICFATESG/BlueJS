import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { ServiceComponent } from '../service/service.component'
import { AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'bjs-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  hasIniti : boolean =false
  @Output() eventAt:string=''
  @Output() workshopAt:string=''
  @Output() selecionaEvento =  new EventEmitter<String>()
  @Output() eventos:string[]=[
    'ForumCientifico',
    'RoadSec',
    'MundoSenai'
  ]
  ofForum:string[]=[
    'IOTOficina',
    'BigData',
    'CoffeBreak'
  ]
  ofRoad:string[]=[
    'HKAFLAG',
    'Drrone',
    'LOCKPICK'
  ]

  ofSenai:string[]=[
    'Palestra sobre internet das coisas',
    'LabAberto',
    'IniciaçaoCientifica'
  ]
  items: FirebaseListObservable<any>;
  ofAtual:string[]=[]
  temp:Array<object>;
  eventoSelecionado(evento: String){

    if(evento === "ForumCientifico") return this.ofAtual=this.ofForum
    else if(evento === "RoadSec") return this.ofAtual=this.ofRoad
    else if(evento === "MundoSenai") return this.ofAtual=this.ofSenai

  }

  onChangeEvent(selectedEvent){
    console.log(selectedEvent)
    this.eventoSelecionado(selectedEvent)
    this.eventAt=selectedEvent
  }

  onChangeWorkshop(selectedWorkshop){
    console.log(selectedWorkshop)
    this.workshopAt=selectedWorkshop
  }

  initTheCount(){
    console.log("BORAAAAAAAAAA")
    this.hasIniti=true
    //this.form_submit(this.eventAt,this.workshopAt)
    //this.snap_databaseUser()
    this.snap_databaseWorkshop()
  }
  cancelTheCount(){
    console.log("Paroooooooooooo")
    this.hasIniti=false
  }

  constructor(private angularFire: AngularFireDatabase) {

  }

  ngOnInit() {
  }

  form_submit(eventAt: string,workshopAt: string) {
  this.angularFire.list("").push(
  {
  event: eventAt,
  workshop:workshopAt
  }
  ).then((t: any) => console.log('dados gravados: ' + t.key)),
  (e: any) => console.log(e.message);

  }

  snap_databaseUser(){
    this.items = this.angularFire.list('/Usuarios', { preserveSnapshot: true });
this.items.subscribe(snapshots => {
    snapshots.forEach(snapshot => {
      console.log(snapshot.key)
      console.log(snapshot.val().bluetoothMAC)

    });
  })
  }

  snap_databaseWorkshop(){
    this.items = this.angularFire.list('/Oficinas', { preserveSnapshot: true });
this.items.subscribe(snapshots => {
    snapshots.forEach(snapshot => {
      console.log(snapshot.key)
      console.log(snapshot.val())
    });
  })
  }

}
