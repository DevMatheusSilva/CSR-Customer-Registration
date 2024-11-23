import IDAO from "../IDAO";
import {DataSource, Repository} from "typeorm";
import Bandeira from "../../entities/Bandeira";

export default class BandeiraDAO implements IDAO<Bandeira> {
    private dataSource: DataSource;
    private repository: Repository<Bandeira>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Bandeira);
    }

    public async salvar(bandeira: Bandeira): Promise<Bandeira> {
        return await this.repository.save(bandeira);
    }

    public async buscarTodos(): Promise<Bandeira[] | null> {
        return await this.repository.find();
    }

    public async getBandeiraByCode(codigo: string): Promise<Bandeira | null> {
        return await this.repository.findOneBy({codigo});
    }
}