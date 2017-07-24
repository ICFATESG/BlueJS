import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';

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

  ofAtual:string[]=[]
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
  }
  cancelTheCount(){
    console.log("Paroooooooooooo")
    this.hasIniti=false
  }
  constructor() { }

  ngOnInit() {
  }



}
