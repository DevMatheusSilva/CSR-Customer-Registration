import { Entity, Column, ManyToOne } from "typeorm";
import Entidade from "./Entidade";
import Cliente from "./Cliente";
import TipoDeTelefone from "../enums/TipoTelefone";

@Entity("tb_telefone")
export default class Telefone extends Entidade {
  @Column({ type: "varchar" })
  ddd!: string;

  @Column({ type: "varchar" })
  numero!: string;

  @Column({ type: "enum", enum: TipoDeTelefone })
  tipo!: TipoDeTelefone;

  @ManyToOne(() => Cliente, (cliente: Cliente) => cliente.telefones)
  cliente!: Cliente;

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