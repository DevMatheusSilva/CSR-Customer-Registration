import Pais from "./Pais";
import Entidade from "./Entidade";
import TipoEndereco from "./enums/TipoEndereco";

export default class Endereco extends Entidade {
  cep!: string;
  numero!: string;
  complemento!: string;
  logradouro!: string;
  tipoLogradouro!: string;
  bairro!: string;
  fraseCurta!: string;
  observacao!: string;
  cidade!: string;
  estado!: string;
  pais!: Pais;
  tipo!: TipoEndereco;

  setCep(cep: string): void {
    const cepRegex: RegExp = /\d{5}-\d{3}/;
    if (!cepRegex.test(cep)) {
      throw new Error(`CEP inválido: ${cep}`);
    }

    this.cep = cep;
  }

  setNumero(numero: string): void {
    const numeroRegex: RegExp = /^\d{1,4}$/
    if (!numeroRegex.test(numero)) {
      throw new Error(`Número inválido: ${numero}`);
    }
    this.numero = numero;
  }

  setComplemento(complemento: string): void {
    this.complemento = complemento;
  }

  setLogradouro(logradouro: string): void {
    this.logradouro = logradouro;
  }

  setTipoLogradouro(tipoLogradouro: string): void {
    this.tipoLogradouro = tipoLogradouro;
  }

  setBairro(bairro: string): void {
    this.bairro = bairro;
  }

  setFraseCurta(fraseCurta: string): void {
    this.fraseCurta = fraseCurta;
  }

  setObservacao(observacao: string): void {
    this.observacao = observacao;
  }

  setCidade(cidade: string): void {
    this.cidade = cidade;
  }

  setEstado(estado: string): void {
    this.estado = estado;
  }

  setPais(pais: Pais): void {
    this.pais = pais;
  }

  setTipoEndereco(tipo: TipoEndereco): void {
    this.tipo = tipo;
  }
}