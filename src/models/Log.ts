import Entidade from "./Entidade";
import Usuario from "./Usuario";

export default class Log extends Entidade {
  dataEHora!: Date;
  usuario!: Usuario;

  setDataEHora(dataEHora: Date): void {
    this.dataEHora = dataEHora;
  }

  setUsuario(usuario: Usuario): void {
    this.usuario = usuario;
  }
}