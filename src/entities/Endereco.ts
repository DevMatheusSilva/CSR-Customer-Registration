import {Entity, Column, OneToOne, ManyToOne, JoinColumn} from "typeorm";
import Entidade from "./Entidade";
import Pais from "./Pais";
import Cliente from "./Cliente";
import TipoEndereco from "../enums/TipoEndereco";

@Entity("tb_endereco")
export default class Endereco extends Entidade {
    @Column({type: "varchar"})
    cep!: string;

    @Column({type: "varchar"})
    numero!: string;

    @Column({type: "varchar"})
    complemento?: string;

    @Column({type: "varchar"})
    logradouro!: string;

    @Column({type: "varchar"})
    tipoLogradouro!: string;

    @Column({type: "varchar"})
    bairro!: string;

    @Column({type: "varchar"})
    fraseCurta!: string;

    @Column({type: "varchar"})
    observacao?: string;

    @Column({type: "varchar"})
    cidade!: string;

    @Column({type: "varchar"})
    estado!: string;

    @OneToOne(() => Pais, {cascade: true, eager: true})
    @JoinColumn()
    pais!: Pais;

    @Column({type: "enum", enum: TipoEndereco})
    tipo!: TipoEndereco;

    @ManyToOne(() => Cliente, (cliente: Cliente) => cliente.enderecos)
    cliente!: Cliente;

    novosDados!: Endereco;

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
}