import IStrategy from "../../IStrategy";
import Endereco from "../../../entities/Endereco";

export default class ValidarTiposEndereco implements IStrategy {
    processar(enderecos: Endereco[]) {
        let entrega = 0;
        let cobranca = 0;

        enderecos.forEach(endereco => {
            if (endereco.tipo === "ENTREGA") {
                entrega++;
            }
            if (endereco.tipo === "COBRANÇA") {
                cobranca++;
            }
            if (endereco.tipo === "ENTREGA_E_COBRANCA") {
                entrega++;
                cobranca++;
            }
        });

        if (entrega === 0) {
            throw new Error("O cliente deve possuir ao menos um endereço de entrega");
        }
        if (cobranca === 0) {
            throw new Error("O cliente deve possuir ao menos um endereço de cobrança");
        }
    }
}