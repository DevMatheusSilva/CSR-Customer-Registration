import Entidade from "./Entidade";

export default class Bandeira extends Entidade {
  descricao!: string;

  setDescricao(descricao: string): void {
    this.descricao = descricao;
  }
}