import IDAO from "../IDAO";
import {DataSource, Repository} from "typeorm";
import Usuario from "../../entities/Usuario";

export default class UsuarioDAO implements IDAO<Usuario> {
    private dataSource: DataSource;
    private repository: Repository<Usuario>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Usuario);
    }

    public async salvar(usuario: Usuario): Promise<Usuario> {
        return await this.repository.save(usuario);
    }

    public async buscarTodos(): Promise<Usuario[]> {
        return await this.repository.find();
    }
}