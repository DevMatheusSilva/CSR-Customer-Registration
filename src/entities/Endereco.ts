import Pais from "./Pais";
import Entidade from "./Entidade";
import TipoEndereco from "../enums/TipoEndereco";

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

  constructor(
    cep: string, 
    numero: string, 
    complemento: string, 
    logradouro: string, 
    tipoLogradouro: string, 
    bairro: string, 
    fraseCurta: string, 
    observacao: string, 
    cidade: string, 
    estado: string, 
    pais: Pais, 
    tipo: TipoEndereco
  ) {
    super();
    this.cep = cep;
    this.numero = numero;
    this.complemento = complemento;
    this.logradouro = logradouro;
    this.tipoLogradouro = tipoLogradouro;
    this.bairro = bairro;
    this.fraseCurta = fraseCurta;
    this.observacao = observacao;
    this.cidade = cidade;
    this.estado = estado;
    this.pais = pais;
    this.tipo = tipo;
  }

  validarDadosEndereco(): void {
    this.validarCep();
    this.validarNumero();
    this.pais.validarDadosPais();
  }
  
  private validarCep(): void {
    const cepRegex: RegExp = /\d{5}-\d{3}/;
    if (!cepRegex.test(this.cep)) {
      throw new Error(`CEP inválido: ${this.cep}`);
    }
  }

  private validarNumero(): void {
    const numeroRegex: RegExp = /^\d{1,4}$/
    if (!numeroRegex.test(this.numero)) {
      throw new Error(`Número inválido: ${this.numero}`);
    }
  }
}