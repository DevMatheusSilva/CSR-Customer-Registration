import Entidade from "./Entidade";

export default class Pais extends Entidade {
  nome!: string;
  sigla!: string; 

  constructor(nome: string, sigla: string) {
    super();
    this.nome = nome;
    this.sigla = sigla;
  }

  validarDadosPais(): void {
    this.validarSigla();
  }

  private validarSigla(): void {
    const siglaRegex: RegExp = /^[A-Z]{2}$/;
    if(!siglaRegex.test(this.sigla)) {
      throw new Error(`Sigla inválida: ${this.sigla}`);
    }
  }
}