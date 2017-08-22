import { Usuario } from '../usuario/usuario.model';
import { Workshop } from './home-fb/workshop.model';
import { Component, OnInit,Input,Output,EventEmitter,AfterViewInit,OnDestroy,AfterViewChecked} from '@angular/core';
import { ServiceComponent } from '../service/service.component'
import { HomeFbModule} from '../home/home-fb/home-fb.module'
import { AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
import {Event} from './home-fb/event.model'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core'
import { MacsComponent } from "../mac/macs.component";
import {Mac} from '../mac/mac.model'
import { MacService } from "../mac/mac.service";

@Component({
  selector: 'bjs-home',
  templateUrl: './home.component.html'
})
@Injectable()
export class HomeComponent implements OnInit {
  private tokenInterval: any;  
  hasIniti : boolean =false
  @Output() eventAt:string=''
  @Output() workshopAt:string=''
  @Output() selecionaEvento =  new EventEmitter<String>()
  @Output() eventos:Event[]=[];
  @Output() oficinas:Workshop[]=[];
  @Output() selectEvent: string;
  @Output() selectWorkshop: string
  @Output() hasSelec: boolean = false;

  macObs:Observable<Mac[]>
  items: FirebaseListObservable<any>;
  temp:Array<object>;
  ofAtual:string[]=[]
  constructor(private usr:Usuario,private mService:MacService,private macs: MacsComponent,private angularFire: AngularFireDatabase,public hfb: HomeFbModule,private event:Event,private service:ServiceComponent) {
    this.eventos =this.hfb.snapdbEventos()
  }
  ngAfterViewChecked()
  {
     let tempoSeg = 1;
     //this.tokenInterval = setInterval(this.initTheCount, tempoSeg * 1000);

  }

  ngOnDestroy()
  {
     if (!!this.tokenInterval) clearInterval(this.tokenInterval);
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
    //console.log("BORAAAAAAAAAA")
    this.hasIniti=true
    this.macObs=this.mService.getMacs();
    this.marcaEntrada(this.macObs)
   //this.hfb.testeSET(this.workshopAt)
    console.log('carniça');
    
  }
  cancelTheCount(){
    //console.log("Paroooooooooooo")
    this.hasIniti=false
  }

  marcaEntrada(obs:Observable<Mac[]>){
    
    
    obs.subscribe(macs=>{
      macs.forEach((mac)=>{
        let us: any;
        us = new Usuario;
        let resultObservable : FirebaseListObservable <any>
        resultObservable= this.hfb.getUserKeyMAC(String(mac.mac));
        resultObservable.subscribe(usuarios => {
          usuarios.forEach(usr =>{
            this.hfb.entradaSET(String(usr.key), this.workshopAt, this.eventAt, String(usr.val().bluetoothMAC))
          }
            
          )
          
        }, (error) => { console.log('ocorreu um erro', error); });
      })
  })
  }
  ngOnInit(){

  }






}
