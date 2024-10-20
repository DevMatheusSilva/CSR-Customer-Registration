import Entidade from "./Entidade";
import Usuario from "./Usuario";
import fs from "fs";
import path from "path"

export default class Log extends Entidade {
  dataEHora!: Date;
  usuario!: Usuario;

  constructor(dataEHora: Date, usuario: Usuario) {
    super();
    this.dataEHora = dataEHora;
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