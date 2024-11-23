import {Entity, Column, OneToOne, ManyToOne, JoinColumn} from "typeorm";
import Bandeira from "./Bandeira";
import Cliente from "./Cliente";
import Entidade from "./Entidade";

@Entity("tb_cartao")
export default class Cartao extends Entidade {
    @Column({type: "varchar"})
    numero!: string;

    @Column({type: "varchar"})
    nomeImpresso!: string;

    @Column({type: "varchar"})
    cvv!: string;

    @Column({type: "boolean", default: false})
    isPreferencial!: boolean;

    @ManyToOne(() => Bandeira, {eager: true})
    @JoinColumn()
    bandeira!: Bandeira;

    bandeiraCode: string;

    @ManyToOne(() => Cliente, (cliente: Cliente) => cliente.cartoes)
    cliente!: Cliente;

    constructor(
        numero: string,
        nomeImpresso: string,
        bandeiraCode: string,
        cvv: string,
        isPreferencial: boolean
    ) {
        super();
        this.numero = numero;
        this.nomeImpresso = nomeImpresso;
        this.bandeiraCode = bandeiraCode;
        this.cvv = cvv;
        this.isPreferencial = isPreferencial;
    }
}