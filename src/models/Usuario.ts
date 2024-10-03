import Entidade from "./Entidade";
import { genSaltSync, hashSync } from "bcrypt";

export default class Usuario extends Entidade {
  email!: string;
  senha!: string;

  setEmail(email: string): void {
    this.email = email;
  }

  setSenha(senha: string): void {
    const senhaRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;

    if (!senhaRegex.test(senha)) {
      throw new Error('Senha inválida');
    }
  
    const salt = genSaltSync(10);
    const senhaCriptografada = hashSync(senha, salt);
  
    this.senha = senhaCriptografada;
  }
}