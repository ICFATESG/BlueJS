import { HomeComponent } from '../home/home.component';
import { Oficina } from "../oficinas/oficinas.model";
import { Mac } from "../mac/mac.model";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomeFbModule } from "../home/home-fb/home-fb.module";
export class Usuario{

	
	private id : string;
	private bluetoothMAC: string;
	private cpf: string;
	private nome: string;
	private oficinaVisitadas: Oficina[];
	private cacheMAC: Mac[];
    private saidaMAC: Mac[];
    
    constructor(){

    }


	public get $id(): string {
		return this.id;
	}

	public set $id(value: string) {
		this.id = value;
	}

	public get $bluetoothMAC(): string {
		return this.bluetoothMAC;
	}

	public set $bluetoothMAC(value: string) {
		this.bluetoothMAC = value;
	}

	public get $cpf(): string {
		return this.cpf;
	}

	public set $cpf(value: string) {
		this.cpf = value;
	}

	public get $nome(): string {
		return this.nome;
	}

	public set $nome(value: string) {
		this.nome = value;
	}

	public get $oficinaVisitadas(): Oficina[] {
		return this.oficinaVisitadas;
	}

	public set $oficinaVisitadas(value: Oficina[]) {
		this.oficinaVisitadas = value;
	}

	public get $cacheMAC(): Mac[] {
		return this.cacheMAC;
	}

	public set $cacheMAC(value: Mac[]) {
		this.cacheMAC = value;
	}

	public get $saidaMAC(): Mac[] {
		return this.saidaMAC;
	}

	public set $saidaMAC(value: Mac[]) {
		this.saidaMAC = value;
	}
    

//METHODS

public inicializa(obs:Observable<Mac[]>){
	
    if(this.cacheMAC.length == 0){
        obs.subscribe(macs=>{
            macs.forEach((mac)=>{
                this.cacheMAC.push(mac)
            })
            
        })
    }else{
        obs.subscribe(macs=>{
            macs.forEach((mac)=>{
                if(String(mac) in this.cacheMAC){    
                }else{
					this.saidaMAC.push(mac) 
				}
            })
            
        })
	}
	


}

}