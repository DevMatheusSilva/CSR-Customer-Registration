import { Entity, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import Entidade from "./Entidade";
import Usuario from "./Usuario";
import fs from "fs";
import path from "path"

@Entity("tb_log")
export default class Log extends Entidade {
  @CreateDateColumn()
  dataEHora!: Date;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario!: Usuario;

  constructor(usuario: Usuario) {
    super();
    this.usuario = usuario;
  }

  gerarLog(): string {
    const logPath = path.resolve(__dirname, "..", "logs", "log.txt");
    const mensagemLog = `O usuário ${this.usuario.nome} foi criado com sucesso em ${this.dataEHora}`;
    console.log(mensagemLog);
    fs.writeFileSync(logPath, mensagemLog);
    return mensagemLog;
  }
}