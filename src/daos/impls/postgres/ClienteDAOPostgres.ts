import IDAO from "../../IDAO";
import {DataSource, Repository} from "typeorm";
import Cliente from "../../../entities/Cliente";

export default class ClienteDAOPostgres implements IDAO<Cliente> {
    private dataSource: DataSource;
    private repository: Repository<Cliente>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cliente);
    }

    private async validarExistenciaPorCpf(cpf: string): Promise<boolean> {
        const jaExiste = await this.repository.findOneBy({
            usuario: {cpf}
        });

        return Boolean(jaExiste);
    }

    private async validarExistenciaPorEmail(email: string): Promise<boolean> {
        const jaExiste = await this.repository.findOneBy({
            usuario: {email}
        });

        return Boolean(jaExiste);
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        const clienteExiste = await (
            this.validarExistenciaPorCpf(cliente.usuario.cpf) || this.validarExistenciaPorEmail(cliente.usuario.email)
        );

        if (clienteExiste) {
            throw new Error(`O cliente ${cliente.usuario.nome} já existe`);
        }
        return await this.repository.save(cliente);
    }
}