import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Cartao from "./Cartao";
import Usuario from "./Usuario";
import Genero from "./enums/Genero";

export default class Cliente extends Usuario {
  genero!: Genero;
  nome!: string;
  dtNascimento!: Date;
  cpf!: string;
  telefones: Telefone[] = [];
  cartoes: Cartao[] = [];
  enderecos: Endereco[] = [];
  ranking!: number;

  constructor (
    genero: Genero, 
    nome: string, 
    dtNascimento: Date, 
    cpf: string, 
    telefone: Telefone, 
    cartao: Cartao, 
    endereco: Endereco, 
    email: string, 
    senha: string
  ) {
    super(email, senha);
    this.genero = genero;
    this.nome = nome;
    this.dtNascimento = new Date(dtNascimento);
    this.cpf = cpf;
    this.telefones.push(telefone);
    this.cartoes.push(cartao);
    this.enderecos.push(endereco);
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