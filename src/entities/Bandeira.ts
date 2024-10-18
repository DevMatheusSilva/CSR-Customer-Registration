import Entidade from "./Entidade";

export default class Bandeira extends Entidade {
  descricao!: string;

  constructor(descricao: string) {  
    super();
    this.descricao = descricao;
  }
}