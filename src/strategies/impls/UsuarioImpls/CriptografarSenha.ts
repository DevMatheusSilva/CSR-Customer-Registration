import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import Usuario from "../../../entities/Usuario";
import {genSaltSync, hashSync} from "bcrypt";

export default class CriptografarSenha implements IStrategy {
    public processar(entidade: Entidade): void {
        if (entidade instanceof Usuario) {
            const salt = genSaltSync(10);
            entidade.senha = hashSync(entidade.senha, salt);
        }
    }
}