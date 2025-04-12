import {PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Log from "./Log";

export default abstract class Entidade {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "boolean", default: true})
    estaAtivo!: boolean;

    @OneToMany("Log", "entidade")
    logs!: Log[];
}