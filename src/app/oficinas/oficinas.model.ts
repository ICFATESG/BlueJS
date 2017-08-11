export class Oficina{

    private horaInicio: string;
    private horaFim: string;
    private id: string;
    private local: string;
    private nomeOficina: string;
    private palestrante: string;
   
    constructor(){

    }
//G/S horaInicio
	public get $horaInicio(): string {
		return this.horaInicio;
	}

	public set $horaInicio(value: string) {
		this.horaInicio = value;
	}
//G/S id
	public get $id(): string {
		return this.id;
	}

	public set $id(value: string) {
		this.id = value;
	}
    
//G/S horaFim
	public get $horaFim(): string {
		return this.horaFim;
	}

	public set $horaFim(value: string) {
		this.horaFim = value;
	}
//G/S local
	public get $local(): string {
		return this.local;
	}

	public set $local(value: string) {
		this.local = value;
	}
//G/S nomeOficina
	public get $nomeOficina(): string {
		return this.nomeOficina;
	}

	public set $nomeOficina(value: string) {
		this.nomeOficina = value;
	}
//G/S palestrante
	public get $palestrante(): string {
		return this.palestrante;
	}

	public set $palestrante(value: string) {
		this.palestrante = value;
	}
//METHODS


}