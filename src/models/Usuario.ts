import Entidade from "./Entidade";
import { genSaltSync, hashSync } from "bcrypt";

export default class Usuario extends Entidade {
  email!: string;
  senha!: string;
  nome!: string;

  constructor(email: string, senha: string, nome: string) {
    super();
    this.email = email;
    this.senha = this.criptografarSenha(senha);
    this.nome = nome;
  }

  private criptografarSenha(senha: string): string {
    this.validarSenha(senha);

    const salt = genSaltSync(10);
    const senhaCriptografada = hashSync(senha, salt);

    return senhaCriptografada;
  }

  private validarSenha(senha: string): void {
    const senhaRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;
    if (!senhaRegex.test(senha)) {
      throw new Error('Senha inválida');
    }
  }
}
