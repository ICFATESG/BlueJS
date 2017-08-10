import { Component, OnInit,Input } from '@angular/core';
import { Mac } from "../mac/mac.model";
@Component({
  selector: 'bjs-mac',
  templateUrl: './mac.component.html'
})
export class MacComponent implements OnInit {
  @Input() mac:Mac
  constructor() { }

  ngOnInit() {
  }

}
