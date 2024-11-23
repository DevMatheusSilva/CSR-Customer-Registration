import IDAO from "../IDAO";
import {DataSource, Repository} from "typeorm";
import Endereco from "../../entities/Endereco";

export default class EnderecoDAO /*implements IDAO<Endereco>*/ {
    private dataSource: DataSource;
    private repository: Repository<Endereco>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Endereco);
    }

    public async salvar(endereco: Endereco): Promise<Endereco> {
        // TODO: Implementar
        return await this.repository.save(endereco);
    }

    public async buscarTodos(): Promise<Endereco[]> {
        // TODO: Implementar
        return await this.repository.find();
    }

    public async buscarPorIdCliente(idCliente: string): Promise<Endereco[] | null> {
        const enderecosDoCliente = await this.repository.find({where: {cliente: {id: idCliente}}});
        return enderecosDoCliente ? enderecosDoCliente : null;
    }

    public async atualizarRegistro(enderecoAtualizado: Endereco): Promise<void> {
        // TODO: Implementar
    }
}