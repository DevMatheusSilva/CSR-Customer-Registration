import {Entity, Column} from "typeorm";
import Entidade from "./Entidade";

@Entity("tb_usuario")
export default class Usuario extends Entidade {
    @Column({type: "varchar"})
    email!: string;

    @Column({type: "varchar"})
    senha!: string;

    @Column({type: "varchar"})
    nome!: string;

    @Column({type: "varchar", nullable: true})
    cpf!: string;

    constructor(email: string, senha: string, nome: string, cpf: string) {
        super();
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.cpf = cpf;
    }
}
