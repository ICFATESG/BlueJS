import { Mac } from './mac.model';
import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MacService {

constructor(private http : Http){}
macs(search?:string):Promise<Mac[]>{
return     
}
}
