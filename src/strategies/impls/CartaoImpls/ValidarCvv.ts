import IStrategy from "../../IStrategy";
import Cartao from "../../../entities/Cartao";

export default class ValidarCvv implements IStrategy {
    public processar(cartao: Cartao) {
        const cardCvvRegex: RegExp = /^\d{3,4}$/;
        if (!cardCvvRegex.test(cartao.cvv)) {
            throw new Error(`Código de verificação inválido: ${cartao.cvv}`);
        }
    }
}