import Entidade from "./Entidade";
import Usuario from "./Usuario";

export default class Log extends Entidade {
  dataEHora!: Date;
  usuario!: Usuario;

  constructor(dataEHora: Date, usuario: Usuario) {
    super();
    this.dataEHora = dataEHora;
    this.usuario = usuario;
  }

  gerarLog(): string {
    const mensagemLog = `O usuário ${this.usuario.nome} foi criado com sucesso em ${this.dataEHora}`;
    console.log(mensagemLog); // TODO: Implementar lógica para salvar log em arquivo
    return mensagemLog;
  }
}