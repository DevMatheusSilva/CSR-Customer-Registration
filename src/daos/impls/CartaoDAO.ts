import IDAO from "../IDAO";
import {DataSource, Repository} from "typeorm";
import Cartao from "../../entities/Cartao";

export default class CartaoDAO implements IDAO<Cartao[]> {
    private dataSource: DataSource;
    private repository: Repository<Cartao>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cartao);
    }

    public async salvar(cartoes: Cartao[]): Promise<Cartao[]> {
        return await this.repository.save(cartoes);
    }

    public async buscarTodos(idCliente?: string): Promise<Cartao[] | null> {
        return idCliente ?
            await this.repository.find({where: {cliente: {id: idCliente}}}) :
            await this.repository.find();
    }
}