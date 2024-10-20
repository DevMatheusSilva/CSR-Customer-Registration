import { Entity, Column } from "typeorm";
import Entidade from "./Entidade";

@Entity("tb_pais")
export default class Pais extends Entidade {
  @Column({ type: "varchar" })
  nome!: string;

  @Column({ type: "varchar" })
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