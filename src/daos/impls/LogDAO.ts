import IDAO from "../IDAO";
import {DataSource, Repository} from "typeorm";
import Log from "../../entities/Log";

export default class LogDAO implements IDAO<Log> {
    private dataSource: DataSource;
    private repository: Repository<Log>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Log);
    }

    async salvar(log: Log): Promise<Log> {
        return await this.repository.save(log);
    }

    async buscarTodos(): Promise<Log[] | null> {
        return await this.repository.find();
    }
}