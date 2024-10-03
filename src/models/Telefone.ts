import Entidade from "./Entidade";
import TipoDeTelefone from "./enums/TipoTelefone";

export default class Telefone extends Entidade {
  ddd!: string;
  numero!: string;
  tipo!: TipoDeTelefone;

  setDdd(ddd: string): void {
    if (ddd.trim().length !== 2) {
      throw new Error(`Invalid DDD: ${ddd}`);
    }
    this.ddd = ddd;
  }

  setNumero(numero: string): void {
    const numberRegex: RegExp = /^\d{4}-\d{4}$|^\d{5}-\d{4}$/;
    if (!numberRegex.test(numero)){
      throw new Error(`Número de telefone inválido: ${numero}`);
    }
    this.numero = numero;
  }

  setTipo(tipo: TipoDeTelefone): void {
    this.tipo = tipo;
  }
}