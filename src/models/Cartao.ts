import Bandeira from "./Bandeira";
import Entidade from "./Entidade";

export default class Cartao extends Entidade {
  numero!: string;
  nomeImpresso!: string;
  cvv!: string;
  ePreferencial!: boolean;
  bandeira!: Bandeira;

  setNumero(numero: string): void {
    const cardNumeroRegex: RegExp = /^(?:\d[ -]*?){13,16}$/;
    if (!cardNumeroRegex.test(numero)) {
      throw new Error(`Número de cartão inválido: ${numero}`);
    }
    
    this.numero = numero;
  }

  setNomeImpresso(nomeImpresso: string): void {
    this.nomeImpresso = nomeImpresso;
  }

  setCvv(cvv: string): void {
    const cardCvvRegex: RegExp = /^\d{3,4}$/;
    if (!cardCvvRegex.test(cvv)) {
      throw new Error(`Código de verificação inválido: ${cvv}`);
    }

    this.cvv = cvv;
  }

  setEPreferencial(ePreferencial: boolean): void {
    this.ePreferencial = ePreferencial;
  }

  setBandeira(bandeira: Bandeira): void {
    this.bandeira = bandeira;
  }
}