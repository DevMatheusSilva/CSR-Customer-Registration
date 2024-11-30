import {Entity, CreateDateColumn, Column} from "typeorm";
import Entidade from "./Entidade";
import TipoLog from "../enums/TipoLog";

@Entity("tb_log")
export default class Log extends Entidade {
    @CreateDateColumn()
    dataEHora!: Date;

    @Column({type: "uuid", nullable: true})
    entidadeId!: string;

    @Column({type: "varchar", nullable: true})
    entidadeTipo!: string;

    @Column({type: "varchar"})
    descricao!: TipoLog;

    constructor(entidadeId: string, entidadeTipo: string, descricao: TipoLog) {
        super();
        this.entidadeId = entidadeId;
        this.entidadeTipo = entidadeTipo;
        this.descricao = descricao;
    }
}
