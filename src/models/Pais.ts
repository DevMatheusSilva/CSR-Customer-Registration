import Entidade from "./Entidade";

export default class Pais extends Entidade {
  nome!: string;
  sigla!: string; 

  setNome(nome: string): void {
    this.nome = nome;
  }

  setSigla(sigla: string): void {
    const siglaRegex: RegExp = /^[A-Z]{2}$/;
    if(!siglaRegex.test(sigla)) {
      throw new Error(`Sigla inválida: ${sigla}`);
    }

    this.sigla = sigla;
  }
}