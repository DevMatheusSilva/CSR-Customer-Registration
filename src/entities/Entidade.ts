import { PrimaryGeneratedColumn, Column } from "typeorm";

export default abstract class Entidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "boolean", default: true })
  estaAtivo!: boolean;
}