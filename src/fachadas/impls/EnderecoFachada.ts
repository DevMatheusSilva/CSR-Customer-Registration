import IFachada from "../IFachada";
import Endereco from "../../entities/Endereco";
import EnderecoDAO from "../../daos/impls/EnderecoDAO";

export default class EnderecoFachada /*implements IFachada*/ {
    private dao: EnderecoDAO;

    constructor(dao: EnderecoDAO) {
        this.dao = dao;
    }

    public async buscarPorIdCliente(idCliente: string): Promise<Endereco[]> {
        const enderecosEncontrados = await this.dao.buscarPorIdCliente(idCliente);
        if (!enderecosEncontrados) {
            throw new Error(`Endereços pertencentes ao cliente com o id ${idCliente} não encontrados`);
        }
        return enderecosEncontrados;
    }

    public async atualizarEndereco() {
        // TODO: WIP
    }
}