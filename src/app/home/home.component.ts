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
  maCACHE:Observable<Mac[]>;
  macSaida:Mac[];
  items: FirebaseListObservable<any>;
  temp:Array<object>;
  ofAtual:string[]=[];
  constructor(private usr:Usuario,private mService:MacService,private macs: MacsComponent,private angularFire: AngularFireDatabase,public hfb: HomeFbModule,private event:Event,private service:ServiceComponent) {
    this.eventos =this.hfb.snapdbEventos()
    this.hasIniti=false
  }
  ngOnInit(){
    console.log('onInit...');
    
    this.separador()
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
    this.separador()
   /* if (this.selectWorkshop==undefined || this.selectEvent==undefined){  
      alert('Favor selecionar um evento e uma oficina.')
    } else {
      this.hasIniti = true
      this.principal()
    }*/
  }
  cancelTheCount(){
    this.hasIniti=false
  }

  principal(){
    if(this.hasIniti==true){
      let timer:any
      timer =setTimeout(() => {this.principal()},1000*20);
    }
      this.entrada()
  }

  separador(){
    this.macObs=this.mService.getMacs();
    if(this.maCACHE==undefined){
      this.maCACHE=this.macObs
    }else{
      this.macObs.subscribe(macs1=>{
        macs1.forEach((mac1)=>{
          let cont=0;
          let positive=false;
            this.maCACHE.subscribe(macs2=>{
              macs2.forEach((mac2)=>{
                console.log(mac1.mac + " <==> "+ mac2.mac);
                cont++
                if(cont<macs2.length || positive==false){
                  
                  if(mac1.mac == mac2.mac){
                    positive=true
                    console.log('false');
                    
                  }
                  if(positive){
                    console.log('true?');
                  }
                }
              })
            })
        })
      })
    }

  }  

  entrada(){
        this.marcaEntrada(this.macObs)
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
  





}
