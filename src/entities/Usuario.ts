import { Entity, Column } from "typeorm";
import Entidade from "./Entidade";
import { genSaltSync, hashSync } from "bcrypt";

@Entity("tb_usuario")
export default class Usuario extends Entidade {
  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar" })
  senha!: string;

  @Column({ type: "varchar" })
  nome!: string;

  constructor(email: string, senha: string, nome: string) {
    super();
    this.email = email;
    if(senha) {
      this.senha = this.criptografarSenha(senha);
    }
    this.nome = nome;
  }

  private criptografarSenha(senha: string): string {
    this.validarSenha(senha);
    const salt = genSaltSync(10);
    return  hashSync(senha, salt);
  }

  private validarSenha(senha: string): void {
    const senhaRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;
    if (!senhaRegex.test(senha)) {
      throw new Error('Senha inválida');
    }
  }
}
