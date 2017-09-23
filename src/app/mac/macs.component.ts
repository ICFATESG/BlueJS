import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, Input } from '@angular/core';
import { Mac } from "../mac/mac.model";
import { MacService } from "./mac.service";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Component({
    selector: 'bjs-macs',
})
export class MacsComponent implements OnInit {
    macs: Mac[];
    constructor(private service: MacService) { }

    ngOnInit() {
       
    }
    
    printMacs(macsObservable:Observable<Mac[]>) {
        
        macsObservable.subscribe(macs=>{
            macs.forEach((mac)=>{    
                let a:string
                a=mac.mac
                console.log("a user have a mac => "+a);
            })
            
        })
    }
}