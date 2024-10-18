import Bandeira from "./Bandeira";
import Entidade from "./Entidade";

export default class Cartao extends Entidade {
  numero!: string;
  nomeImpresso!: string;
  cvv!: string;
  isPreferencial!: boolean;
  bandeira!: Bandeira;

  constructor(
    numero: string, 
    nomeImpresso: string, 
    bandeira: Bandeira,
    cvv: string, 
    isPrefencial: boolean 
  ) {
    super();
    this.numero = numero;
    this.nomeImpresso = nomeImpresso;
    this.bandeira = bandeira; 
    this.cvv = cvv;
    this.isPreferencial = isPrefencial;
  }

  validarDadosCartao(): void {
    this.validarNumero();
    this.validarCvv();
  }

  private validarNumero(): void {
    const cardNumeroRegex: RegExp = /^(?:\d[ -]*?){13,16}$/;
    if (!cardNumeroRegex.test(this.numero)) {
      throw new Error(`Número de cartão inválido: ${this.numero}`);
    }
  }

  private validarCvv(): void {
    const cardCvvRegex: RegExp = /^\d{3,4}$/;
    if (!cardCvvRegex.test(this.cvv)) {
      throw new Error(`Código de verificação inválido: ${this.cvv}`);
    }
  }
}