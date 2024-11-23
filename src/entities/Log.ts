import {Entity, CreateDateColumn, OneToOne, JoinColumn, Column} from "typeorm";
import Entidade from "./Entidade";
import Usuario from "./Usuario";
import TipoLog from "../enums/TipoLog";

@Entity("tb_log")
export default class Log extends Entidade {
    @CreateDateColumn()
    dataEHora!: Date;

    @OneToOne(() => Usuario)
    @JoinColumn()
    usuario!: Usuario;

    @Column({type: "varchar"})
    descricao!: TipoLog;

    constructor(usuario: Usuario, descricao: TipoLog) {
        super();
        this.usuario = usuario;
        this.descricao = descricao;
    }
}
