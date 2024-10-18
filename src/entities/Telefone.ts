import Entidade from "./Entidade";
import TipoDeTelefone from "../enums/TipoTelefone";

export default class Telefone extends Entidade {
  ddd!: string;
  numero!: string;
  tipo!: TipoDeTelefone;

  constructor(ddd: string, numero: string, tipo: TipoDeTelefone) {
    super();
    this.ddd = ddd;
    this.numero = numero;
    this.tipo = tipo;
  }

  validarDadosTelefone(): void {
    this.validarDdd();
    this.validarNumero();
  }

  private validarDdd(): void {
    if (this.ddd.trim().length !== 2) {
      throw new Error(`DDD inválido: ${this.ddd}`);
    }
  }
  
  private validarNumero(): void {
    const numeroRegex: RegExp = /^\d{4}-\d{4}$|^\d{5}-\d{4}$/;
    if (!numeroRegex.test(this.numero)){
      throw new Error(`Número de telefone inválido: ${this.numero}`);
    }
  }
}