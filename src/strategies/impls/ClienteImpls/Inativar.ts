import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import Cliente from "../../../entities/Cliente";

export default class Inativar implements IStrategy {
    public processar(entidade: Entidade) {
        if (entidade instanceof Cliente) {
            entidade.estaAtivo = false;
            entidade.usuario.estaAtivo = false;

            for (const endereco of entidade.enderecos) {
                endereco.estaAtivo = false;
                endereco.pais.estaAtivo = false;
            }

            for (const cartao of entidade.cartoes) {
                cartao.estaAtivo = false;
            }

            entidade.telefone.estaAtivo = false;
            entidade.usuario.estaAtivo = false;
        }
    }
}