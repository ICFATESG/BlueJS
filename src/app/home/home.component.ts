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


  items: FirebaseListObservable<any>;
  temp:Array<object>;
  ofAtual:string[]=[]
  constructor(private angularFire: AngularFireDatabase,public hfb: HomeFbModule,private event:Event) {
    this.eventos =this.hfb.snapdbEventos()

  }
  onChangeEvent(){
    this.hfb.GLOBALEVENTKEY=this.selectEvent
    this.eventAt=this.hfb.getnameOfEvent(this.selectEvent)
    this.oficinas=this.hfb.snapdbWorkshop(this.hfb.GLOBALEVENTKEY)
    
  }

  onChangeWorkshop(selectedWorkshop){
    this.workshopAt=selectedWorkshop
   // this.hfb.getWorkshop(selectedWorkshop)
  }

  initTheCount(){
    console.log("BORAAAAAAAAAA")
    this.hasIniti=true
    //this.hfb.form_submit(this.eventAt,this.workshopAt)
    //this.hfb.snap_databaseUser()
    //this.hfb.snap_databaseWorkshop()
    

  }
  cancelTheCount(){
    console.log("Paroooooooooooo")
    this.hasIniti=false
  }


  ngOnInit(){

  }






}
