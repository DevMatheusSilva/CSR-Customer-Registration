import {Entity, Column} from "typeorm";
import Entidade from "./Entidade";
import TipoDeTelefone from "../enums/TipoTelefone";

@Entity("tb_telefone")
export default class Telefone extends Entidade {
    @Column({type: "varchar"})
    ddd!: string;

    @Column({type: "varchar"})
    numero!: string;

    @Column({type: "enum", enum: TipoDeTelefone})
    tipo!: TipoDeTelefone;

    constructor(ddd: string, numero: string, tipo: TipoDeTelefone) {
        super();
        this.ddd = ddd;
        this.numero = numero;
        this.tipo = tipo;
    }
}