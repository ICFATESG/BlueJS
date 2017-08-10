import { Component, OnInit, Input } from '@angular/core';
import { Mac } from "../mac/mac.model";
import { MacService } from "./mac.service";
@Component({
    selector: 'bjs-macs',
})
export class MacsComponent implements OnInit {
    macs:Mac[]
    constructor(private service:MacService) { }

    ngOnInit() {
        this.getMacs()
    }
    getMacs(){
        this.service.getMacs().subscribe(macs => this.macs = macs)
        console.log(this.macs);
        
    }
    printMacs(){
        console.log(this.macs);
        
    }
}