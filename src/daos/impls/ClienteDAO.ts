import IDAO from "../IDAO";
import {DataSource, Repository} from "typeorm";
import Cliente from "../../entities/Cliente";

export default class ClienteDAO implements IDAO<Cliente> {
    private dataSource: DataSource;
    private repository: Repository<Cliente>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cliente);
    }

    public async salvar(cliente: Cliente): Promise<Cliente> {
        const clienteExiste = await (
            this.validarExistenciaPorCpf(cliente.usuario.cpf) || this.validarExistenciaPorEmail(cliente.usuario.email)
        );

        if (clienteExiste) {
            throw new Error(`O cliente ${cliente.usuario.nome} já existe`);
        }

        return await this.repository.save(cliente);
    }

    public async buscarTodos(): Promise<Cliente[]> {
        return await this.repository.find();
    }

    public async buscarPorId(id: string): Promise<Cliente | null> {
        const clienteSalvo = await this.repository.findOneBy({id});
        return clienteSalvo ? clienteSalvo : null;
    }

    public async atualizarRegistro(clienteAtualizado: Cliente): Promise<void> {
        await this.repository.save(clienteAtualizado);
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
}