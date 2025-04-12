import {Entity, Column} from "typeorm";
import Entidade from "./Entidade";

@Entity("tb_bandeira")
export default class Bandeira extends Entidade {
    @Column({type: "varchar"})
    descricao!: string;

    @Column({type: "varchar"})
    codigo!: string;

    constructor(descricao: string, codigo: string) {
        super();
        this.descricao = descricao;
        this.codigo = codigo;
    }
}