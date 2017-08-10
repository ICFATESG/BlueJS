import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Mac} from "./mac.model";

@Injectable()
export class MacService {

  constructor(private http: Http) { }

getMacs():Observable<Mac[]>{
  return this.http.get('http://localhost:3000/macs')
    .map(response => response.json())
    
}

}
