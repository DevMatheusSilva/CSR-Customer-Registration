import IStrategy from "../../IStrategy";
import Telefone from "../../../entities/Telefone";

export default class ValidarDdd implements IStrategy {
    public processar(telefone: Telefone) {
        if (telefone.ddd.trim().length !== 2) {
            throw new Error(`DDD inválido: ${telefone.ddd}`);
        }
    }
}