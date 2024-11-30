import {Entity, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Cartao from "./Cartao";
import Usuario from "./Usuario";
import Genero from "../enums/Genero";
import Entidade from "./Entidade";

@Entity("tb_cliente")
export default class Cliente extends Entidade {
    @Column({type: "enum", enum: Genero})
    genero!: Genero;

    @Column({type: "date"})
    dtNascimento!: Date;

    @OneToOne(() => Telefone, {cascade: true, eager: true})
    @JoinColumn()
    telefone!: Telefone;

    @OneToMany(
        () => Cartao,
        (cartao: Cartao) => cartao.cliente,
        {eager: true}
    )
    cartoes!: Cartao[];

    @OneToMany(
        () => Endereco,
        (endereco: Endereco) => endereco.cliente,
        {cascade: true, eager: true}
    )
    enderecos!: Endereco[];

    @OneToOne(() => Usuario, {cascade: true, eager: true})
    @JoinColumn()
    usuario!: Usuario;

    novosDados!: Cliente;

    constructor(
        genero: Genero,
        dtNascimento: Date,
        telefone: Telefone,
        enderecos: Endereco[],
        usuario: Usuario
    ) {
        super();
        this.genero = genero;
        this.dtNascimento = dtNascimento;
        this.telefone = telefone;
        this.enderecos = enderecos;
        this.usuario = usuario;
    }
}