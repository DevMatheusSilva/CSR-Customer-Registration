import IStrategy from "../../IStrategy";
import Endereco from "../../../entities/Endereco";

export default class ValidarSigla implements IStrategy {
    public processar(endereco: Endereco) {
        const siglaRegex: RegExp = /^[A-Z]{2}$/;
        if (!siglaRegex.test(endereco.pais.sigla)) {
            throw new Error(`Sigla do país inválida: ${endereco.pais.sigla}`);
        }
    }
}
