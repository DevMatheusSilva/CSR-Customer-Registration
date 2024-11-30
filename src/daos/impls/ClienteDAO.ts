import IDAO from "../IDAO";
import {DataSource, Repository} from "typeorm";
import Cliente from "../../entities/Cliente";
import ClienteFiltro from "../../controllers/interfaces/ClienteFiltro";

export default class ClienteDAO implements IDAO<Cliente> {
    private dataSource: DataSource;
    private repository: Repository<Cliente>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cliente);
    }

    public async salvar(cliente: Cliente): Promise<Cliente> {
        return await this.repository.save(cliente);
    }

    public async buscarTodos(filtros?: ClienteFiltro): Promise<Cliente[]> {
        let clientesSalvos;
        if (!filtros) {
            clientesSalvos = await this.repository.find();
        } else {
            let query = this.repository.createQueryBuilder('cliente')
                .leftJoinAndSelect('cliente.usuario', 'usuario')
                .leftJoinAndSelect('cliente.telefone', 'telefone')
                .leftJoinAndSelect('cliente.enderecos', 'enderecos');
            if (filtros.nome) {
                query = query.andWhere('usuario.nome LIKE :nome', {nome: `%${filtros.nome}%`});
            }
            if (filtros.cpf) {
                query = query.andWhere('usuario.cpf = :cpf', {cpf: filtros.cpf});
            }
            if (filtros.genero) {
                query = query.andWhere('cliente.genero = :genero', {genero: filtros.genero});
            }
            if (filtros.dtNascimento) {
                query = query.andWhere('cliente.dtNascimento = :dtNascimento', {dtNascimento: filtros.dtNascimento});
            }
            if (filtros.ddd) {
                query = query.andWhere('telefone.ddd = :ddd', {ddd: filtros.ddd});
            }
            if (filtros.telefone) {
                query = query.andWhere('telefone.numero LIKE :numero', {numero: `%${filtros.telefone}%`});
            }
            clientesSalvos = await query.getMany();
        }

        return clientesSalvos;
    }

    public async buscarPorId(id: string): Promise<Cliente | null> {
        const clienteSalvo = await this.repository.findOneBy({id});
        return clienteSalvo ? clienteSalvo : null;
    }

    public async buscarPorEmail(email: string): Promise<Cliente | null> {
        const clienteSalvo = await this.repository.findOneBy({usuario: {email}});
        return clienteSalvo ? clienteSalvo : null;
    }

    public async buscarPorCpf(cpf: string): Promise<Cliente | null> {
        const clienteSalvo = await this.repository.findOneBy({usuario: {cpf}});
        return clienteSalvo ? clienteSalvo : null;
    }
}