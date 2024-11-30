import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import Usuario from "../../../entities/Usuario";

export default class ValidarEmail implements IStrategy {
    public processar(entidade: Entidade) {
        if (entidade instanceof Usuario) {
            const emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
            if (!emailRegex.test(entidade.email)) {
                throw new Error('Email inválido');
            }
        }
    }
}