import { Oficina } from "../oficinas/oficinas.model";
import { Mac } from "../mac/mac.model";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export class Usuario{
    private bluetoothMAC: string;
    private cpf: string;
    private nome: string;
    private oficinas: Oficina[];
    public cacheMAC: Mac[];
    public saidaMAC: Mac[];
    constructor(){

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

public marcaEntrada(obs:Observable<Mac[]>){
    if(this.cacheMAC.length == 0){
        obs.subscribe(macs=>{
            macs.forEach((mac)=>{
                this.cacheMAC.push(mac)
            })
            
        })
    }else{
        obs.subscribe(macs=>{
            macs.forEach((mac)=>{
                if(!mac+"" in this.cacheMAC){
                   this.saidaMAC.push(mac) 
                }
            })
            
        })
    }


}

}