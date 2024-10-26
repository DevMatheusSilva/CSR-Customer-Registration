import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import Pais from "../../../entities/Pais";

export default class ValidarSigla implements IStrategy {
    public processar(entidade: Entidade) {
        if (entidade instanceof Pais) {
            const siglaRegex: RegExp = /^[A-Z]{2}$/;
            if (!siglaRegex.test(entidade.sigla)) {
                throw new Error(`Sigla inválida: ${entidade.sigla}`);
            }
        }
    }
}
