import { Entity, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import Bandeira from "./Bandeira";
import Cliente from "./Cliente";
import Entidade from "./Entidade";

@Entity("tb_cartao")
export default class Cartao extends Entidade {
  @Column({ type: "varchar" })
  numero!: string;

  @Column({ type: "varchar" })
  nomeImpresso!: string;

  @Column({ type: "varchar" })
  cvv!: string;

  @Column({ type: "boolean", default: false })
  isPreferencial!: boolean;

  @OneToOne(() => Bandeira)
  @JoinColumn()
  bandeira!: Bandeira;

  @ManyToOne(() => Cliente, (cliente: Cliente) => cliente.cartoes)
  cliente!: Cliente;

  constructor(
    numero: string, 
    nomeImpresso: string, 
    bandeira: Bandeira,
    cvv: string, 
    isPreferencial: boolean
  ) {
    super();
    this.numero = numero;
    this.nomeImpresso = nomeImpresso;
    this.bandeira = bandeira; 
    this.cvv = cvv;
    this.isPreferencial = isPreferencial;
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