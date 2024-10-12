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

  gerarLog(): void {
    console.log("Log gerado com sucesso !");
  }
}