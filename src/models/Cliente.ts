import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Cartao from "./Cartao";
import Usuario from "./Usuario";
import Genero from "./enums/Genero";

export default class Cliente extends Usuario {
  nome!: string;
  dataDeNascimento!: Date;
  genero!: Genero;
  cpf!: string;
  cartoes: Cartao[] = [];
  enderecos: Endereco[] = [];
  telefones: Telefone[] = [];
  ranking!: number;

  setNome(nome: string): void {
    this.nome = nome;
  }

  setDataDeNascimento(dataDeNascimento: string): void {
    const dataDeNascimentoFormatado: Date = new Date(dataDeNascimento);
    this.dataDeNascimento = dataDeNascimentoFormatado;
  }

  setGenero(genero: Genero): void {
    this.genero = genero;
  }

  setCpf(cpf: string): void {
    const cpfRegex: RegExp = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if (!cpfRegex.test(cpf)) {
      throw new Error(`Invalid CPF: ${cpf}`);
    }
    this.cpf = cpf;
  }

  setUmCartao(cartao: Cartao): void {
    this.cartoes.push(cartao);
  }

  setUmEndereco(endereco: Endereco): void {
    this.enderecos.push(endereco);
  }

  setUmTelefone(telefone: Telefone): void {
    this.telefones.push(telefone);
  }

  setRanking(ranking: number): void {
    this.ranking = ranking;
  }
}