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

    @OneToOne(() => Bandeira, {cascade: true})
    @JoinColumn()
    bandeira!: Bandeira;

    @ManyToOne(() => Cliente, (cliente: Cliente) => cliente.cartoes)
    cliente!: Cliente;

    constructor(
        numero: string,
        nomeImpresso: string,
        bandeira: Bandeira,
        cvv: string,
        isPreferencial: boolean
    ) {
        super();
        this.numero = numero;
        this.nomeImpresso = nomeImpresso;
        this.bandeira = bandeira;
        this.cvv = cvv;
        this.isPreferencial = isPreferencial;
    }
}