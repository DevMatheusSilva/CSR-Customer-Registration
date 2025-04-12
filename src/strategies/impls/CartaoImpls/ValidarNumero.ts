import IStrategy from "../../IStrategy";
import Cartao from "../../../entities/Cartao";
import Telefone from "../../../entities/Telefone";
import Endereco from "../../../entities/Endereco";
import Entidade from "../../../entities/Entidade";

export default class ValidarNumero implements IStrategy {
    public processar(entidade: Entidade) {
        if (entidade instanceof Cartao) {
            const numeroRegex: RegExp = /^(?:\d[ -]*?){13,16}$/;
            if (!numeroRegex.test(entidade.numero)) {
                throw new Error(`Número do cartão inválido: ${entidade.numero}`);
            }
        }

        if (entidade instanceof Telefone) {
            const numeroRegex: RegExp = /^\d{4}-\d{4}$|^\d{5}-\d{4}$/;
            if (!numeroRegex.test(entidade.numero)) {
                throw new Error(`Número do telefone inválido: ${entidade.numero}`);
            }
        }

        if (entidade instanceof Endereco) {
            const numeroRegex: RegExp = /^\d{1,4}$/
            if (!numeroRegex.test(entidade.numero)) {
                throw new Error(`Número do endereço inválido: ${entidade.numero}`);
            }
        }
    }
}