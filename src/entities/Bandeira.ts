import { Entity, Column } from "typeorm";
import Entidade from "./Entidade";

@Entity("tb_bandeira")
export default class Bandeira extends Entidade {
  @Column({ type: "varchar" })
  descricao!: string;

  constructor(descricao: string) {  
    super();
    this.descricao = descricao;
  }
}