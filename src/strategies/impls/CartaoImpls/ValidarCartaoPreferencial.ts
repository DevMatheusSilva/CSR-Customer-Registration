import IStrategy from "../../IStrategy";
import Cartao from "../../../entities/Cartao";

export default class ValidarCartaoPreferencial implements IStrategy {
    processar(cartoes: Cartao[]) {
        let preferenciais = 0;

        cartoes.forEach(cartao => {
            if (cartao.isPreferencial) {
                preferenciais++;
            }
        });

        if (preferenciais === 0) {
            throw new Error("O cliente deve possuir ao menos um cartão preferencial");
        }

        if (preferenciais > 1) {
            throw new Error("O cliente deve possuir apenas um cartão preferencial");
        }
    }
}