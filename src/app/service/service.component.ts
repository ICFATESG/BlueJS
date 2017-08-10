import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'bjs-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {
  private url: string = "http://localhost:3000/macs";
  ngOnInit() {

  }
  constructor(private http:Http){

  }
  


}
