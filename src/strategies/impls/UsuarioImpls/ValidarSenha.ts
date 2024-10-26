import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import Usuario from "../../../entities/Usuario";

export default class ValidarSenha implements IStrategy {
    public processar(entidade: Entidade) {
        if (entidade instanceof Usuario) {
            const senhaRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;
            if (!senhaRegex.test(entidade.senha)) {
                throw new Error('Senha inválida');
            }
        }
    }
}