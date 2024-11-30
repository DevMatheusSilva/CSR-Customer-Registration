import IDAO from "../IDAO";
import {DataSource, Repository} from "typeorm";
import Endereco from "../../entities/Endereco";

export default class EnderecoDAO implements IDAO<Endereco[]> {
    private dataSource: DataSource;
    private repository: Repository<Endereco>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Endereco);
    }

    public async salvar(enderecos: Endereco[]): Promise<Endereco[]> {
        return await this.repository.save(enderecos);
    }

    public async buscarTodos(idCliente?: string): Promise<Endereco[] | null> {
        const enderecos = idCliente ?
            await this.repository.find({where: {cliente: {id: idCliente}}}) :
            await this.repository.find();

        return enderecos ? enderecos : null;
    }
}