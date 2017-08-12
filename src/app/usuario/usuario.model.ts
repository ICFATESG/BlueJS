import { HomeComponent } from '../home/home.component';
import { Oficina } from "../oficinas/oficinas.model";
import { Mac } from "../mac/mac.model";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomeFbModule } from "../home/home-fb/home-fb.module";
export class Usuario{

	
	private id : any;
    private bluetoothMAC: string;
    private cpf: string;
    private nome: string;
    private oficinas?: Oficina[];
    public cacheMAC: Mac[];
    public saidaMAC: Mac[];
    constructor(){

    }

//G/S ID
	public get $id(): any {
		return this.id;
	}

	public set $id(value: any) {
		this.id = value;
	}

//G/S bluetoothMAC
	public get $bluetoothMAC(): string {
		return this.bluetoothMAC;
	}

	public set $bluetoothMAC(value: string) {
		this.bluetoothMAC = value;
	}
//G/S cpf
	public get $cpf(): string {
		return this.cpf;
	}

	public set $cpf(value: string) {
		this.cpf = value;
	}
//G/S nome
	public get $nome(): string {
		return this.nome;
	}

	public set $nome(value: string) {
		this.nome = value;
	}
//G/S oficinas
	public get $oficinas(): Oficina[] {
		return this.oficinas;
	}

	public set $oficinas(value: Oficina[]) {
		this.oficinas = value;
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