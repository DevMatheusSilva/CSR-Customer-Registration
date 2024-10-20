import { Entity, Column, OneToMany } from "typeorm";
import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Cartao from "./Cartao";
import Usuario from "./Usuario";
import Genero from "../enums/Genero";

@Entity("tb_usuario")
export default class Cliente extends Usuario {
  @Column({ type: "enum", enum: Genero })
  genero!: Genero;

  @Column({ type: "date" })
  dtNascimento!: Date;

  @Column({ type: "varchar" })
  cpf!: string;

  @OneToMany(
      () => Telefone,
      (telefone: Telefone) => telefone.cliente,
      { cascade: true, eager: true }
  )
  telefones: Telefone[] = [];

  @OneToMany(
      () => Cartao,
      (cartao: Cartao) => cartao.cliente,
      { cascade: true, eager: true }
  )
  cartoes: Cartao[] = [];

  @OneToMany(
      () => Endereco,
      (endereco: Endereco) => endereco.cliente,
      { cascade: true, eager: true }
  )
  enderecos: Endereco[] = [];

  @Column({ type: "int" })
  ranking!: number;

  constructor(
    genero: Genero,
    nome: string,
    dtNascimento: Date,
    cpf: string,
    telefones: Telefone[],
    cartoes: Cartao[],
    enderecos: Endereco[],
    email: string,
    senha: string
  ) {
    super(email, senha, nome);
    this.genero = genero;
    this.nome = nome;
    this.dtNascimento = dtNascimento;
    this.cpf = cpf;
    this.telefones = telefones;
    this.cartoes = cartoes;
    this.enderecos = enderecos;
  }

  validarDadosObrigatorios(): void {
    this.validarCpf();

    for (const telefone of this.telefones) {
      telefone.validarDadosTelefone();
    }

    for (const cartao of this.cartoes) {
      cartao.validarDadosCartao();
    }

    for (const endereco of this.enderecos) {
      endereco.validarDadosEndereco();
    }
  }

  private validarCpf(): void {
    const cpfRegex: RegExp = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if (!cpfRegex.test(this.cpf)) {
      throw new Error(`CPF inválido: ${this.cpf}`);
    }
  }
}