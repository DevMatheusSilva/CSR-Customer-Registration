import IStrategy from "../../IStrategy";
import Endereco from "../../../entities/Endereco";

export default class ValidarCep implements IStrategy {
    public processar(endereco: Endereco) {
        const cepRegex: RegExp = /\d{5}-\d{3}/;
        if (!cepRegex.test(endereco.cep)) {
            throw new Error(`CEP do endereço inválido: ${endereco.cep}`);
        }
    }
}