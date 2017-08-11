
import { Oficina } from "../oficinas/oficinas.model";
export class Usuario{
    private bluetoothMAC: string;
    private cpf: string;
    private nome: string;
    private oficinas: Oficina[];
    
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


}