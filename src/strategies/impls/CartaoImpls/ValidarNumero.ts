import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import Cartao from "../../../entities/Cartao";
import Telefone from "../../../entities/Telefone";
import Endereco from "../../../entities/Endereco";

export default class ValidarNumero implements IStrategy {
    public processar(entidade: Entidade) {
        if (entidade instanceof Cartao) {
            const numeroRegex: RegExp = /^(?:\d[ -]*?){13,16}$/;
            if (!numeroRegex.test(entidade.numero)) {
                throw new Error(`Número de cartão inválido: ${entidade.numero}`);
            }
        }

        if (entidade instanceof Telefone) {
            const numeroRegex: RegExp = /^\d{4}-\d{4}$|^\d{5}-\d{4}$/;
            if (!numeroRegex.test(entidade.numero)) {
                throw new Error(`Número de telefone inválido: ${entidade.numero}`);
            }
        }

        if (entidade instanceof Endereco) {
            const numeroRegex: RegExp = /^\d{1,4}$/
            if (!numeroRegex.test(entidade.numero)) {
                throw new Error(`Número inválido: ${entidade.numero}`);
            }
        }
    }
}