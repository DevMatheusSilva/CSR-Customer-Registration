import IStrategy from "../../IStrategy";
import ClienteDAO from "../../../daos/impls/ClienteDAO";
import Usuario from "../../../entities/Usuario";

export default class ValidarExistencia implements IStrategy {
    private clienteDAO;

    constructor(clienteDAO: ClienteDAO) {
        this.clienteDAO = clienteDAO;
    }

    async processar(usuario: Usuario) {
        const {cpf, email} = usuario;

        const jaExisteCpf = await this.validarExistenciaPorCpf(cpf);
        const jaExisteEmail = await this.validarExistenciaPorEmail(email);

        if (jaExisteCpf || jaExisteEmail) {
            throw new Error("Cliente já cadastrado");
        }
    }

    private async validarExistenciaPorCpf(cpf: string): Promise<boolean> {
        const jaExiste = await this.clienteDAO.buscarPorCpf(cpf);

        return Boolean(jaExiste);
    }

    private async validarExistenciaPorEmail(email: string): Promise<boolean> {
        const jaExiste = await this.clienteDAO.buscarPorEmail(email);

        return Boolean(jaExiste);
    }
}