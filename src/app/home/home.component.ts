import { Workshop } from './home-fb/workshop.model';
import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { ServiceComponent } from '../service/service.component'
import { HomeFbModule} from '../home/home-fb/home-fb.module'
import { AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
import {Event} from './home-fb/event.model'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core'
import {MacService}from '../service/mac.service'
@Component({
  selector: 'bjs-home',
  templateUrl: './home.component.html'
})
@Injectable()
export class HomeComponent implements OnInit {
  hasIniti : boolean =false
  @Output() eventAt:string=''
  @Output() workshopAt:string=''
  @Output() selecionaEvento =  new EventEmitter<String>()
  @Output() eventos:Event[]=[];
  @Output() oficinas:Workshop[]=[];
  @Output() selectEvent: string;
  @Output() selectWorkshop: string
  @Output() hasSelec: boolean = false;


  items: FirebaseListObservable<any>;
  temp:Array<object>;
  ofAtual:string[]=[]
  constructor(private macFind: MacService,private angularFire: AngularFireDatabase,public hfb: HomeFbModule,private event:Event,private service:ServiceComponent) {
    this.eventos =this.hfb.snapdbEventos()
  }
  onChangeEvent(){
    this.hfb.GLOBALEVENTKEY=this.selectEvent
    this.eventAt=this.hfb.getnameOfEvent()
    this.oficinas = this.hfb.snapdbWorkshop()
    this.hasSelec = true
  }

  onChangeWorkshop(){
    this.hfb.GLOBALWORKSHOPKEY = this.selectWorkshop
    this.workshopAt=this.hfb.getnameOfWork()
  }

  initTheCount(){
    console.log("BORAAAAAAAAAA")
    this.hasIniti=true
    //console.log(this.hfb.getUserKeyMAC(this.service.MAC));
     console.log(this.macFind.macs())
    

  }
  cancelTheCount(){
    console.log("Paroooooooooooo")
    this.hasIniti=false
  }


  ngOnInit(){

  }






}
