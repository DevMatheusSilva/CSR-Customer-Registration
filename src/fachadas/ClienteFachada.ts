import Cliente from "../entities/Cliente";
import ClienteDAO from "../daos/impls/ClienteDAO";
import ValidarNumero from "../strategies/impls/CartaoImpls/ValidarNumero";
import ValidarDdd from "../strategies/impls/TelefoneImpls/ValidarDdd";
import ValidarSenha from "../strategies/impls/UsuarioImpls/ValidarSenha";
import ValidarCpf from "../strategies/impls/UsuarioImpls/ValidarCpf";
import CriptografarSenha from "../strategies/impls/UsuarioImpls/CriptografarSenha";
import GerarLogCriacao from "../strategies/impls/LogImpls/GerarLogCriacao";
import Inativar from "../strategies/impls/ClienteImpls/Inativar";
import ValidarEmail from "../strategies/impls/UsuarioImpls/ValidarEmail";
import GerarLogAtualizacao from "../strategies/impls/LogImpls/GerarLogAtualizacao";
import IStrategy from "../strategies/IStrategy";
import LogDAO from "../daos/impls/LogDAO";
import Atualizar from "../strategies/impls/ClienteImpls/Atualizar";
import ValidarExistencia from "../strategies/impls/ClienteImpls/ValidarExistencia";
import ValidarCep from "../strategies/impls/EnderecoImpls/ValidarCep";
import ValidarSigla from "../strategies/impls/EnderecoImpls/ValidarSigla";
import ClienteFiltro from "../controllers/interfaces/ClienteFiltro";
import ValidarTiposEndereco from "../strategies/impls/EnderecoImpls/ValidarTiposEndereco";

export default class ClienteFachada {
    private clienteDAO: ClienteDAO;
    private logDAO: LogDAO;
    private validacoesTelefone: IStrategy[];
    private validacoesUsuario: IStrategy[];
    private validacoesSenha: IStrategy[];
    private validacoesEndereco: IStrategy[];

    constructor(clienteDAO: ClienteDAO, logDAO: LogDAO) {
        this.clienteDAO = clienteDAO;
        this.logDAO = logDAO;
        this.validacoesTelefone = [new ValidarNumero(), new ValidarDdd()];
        this.validacoesUsuario = [new ValidarEmail(), new ValidarCpf()];
        this.validacoesSenha = [new ValidarSenha(), new CriptografarSenha()];
        this.validacoesEndereco = [new ValidarCep(), new ValidarNumero(), new ValidarSigla()];
    }

    public async salvar(cliente: Cliente): Promise<Cliente> {
        this.validacoesTelefone.forEach(validacao => validacao.processar(cliente.telefone));
        this.validacoesUsuario.forEach(validacao => validacao.processar(cliente.usuario));
        this.validacoesSenha.forEach(validacao => validacao.processar(cliente.usuario));
        await new ValidarExistencia(this.clienteDAO).processar(cliente.usuario);

        new ValidarTiposEndereco().processar(cliente.enderecos);
        cliente.enderecos.forEach(endereco => {
            this.validacoesEndereco.forEach(validacao => validacao.processar(endereco));
        });

        const clienteSalvo = await this.clienteDAO.salvar(cliente);

        await new GerarLogCriacao(this.logDAO).processar(clienteSalvo);
        clienteSalvo.enderecos.forEach(endereco => new GerarLogCriacao(this.logDAO).processar(endereco));
        return clienteSalvo;
    }

    public async buscarTodos(filtros?: ClienteFiltro): Promise<Cliente[]> {
        let clientes;
        if (!filtros) {
            clientes = await this.clienteDAO.buscarTodos();
        } else {
            clientes = await this.clienteDAO.buscarTodos(filtros);
        }

        return clientes.length === 0 ? [] : clientes;
    }

    public async buscarPorId(id: string): Promise<Cliente> {
        const clienteEncontrado = await this.clienteDAO.buscarPorId(id);
        if (!clienteEncontrado) {
            throw new Error(`Cliente com id ${id} não encontrado`);
        }
        return clienteEncontrado;
    }

    public async atualizar(id: string, clienteAtualizado: Cliente): Promise<void> {
        const cliente = await this.clienteDAO.buscarPorId(id);
        if (!cliente) {
            throw new Error(`Cliente com id ${id} não encontrado`);
        }
        cliente.novosDados = clienteAtualizado;

        new Atualizar().processar(cliente);

        this.validacoesTelefone.forEach(validacao => validacao.processar(cliente.telefone));
        this.validacoesUsuario.forEach(validacao => validacao.processar(cliente.usuario));

        const clienteSalvo = await this.clienteDAO.salvar(cliente);
        await new GerarLogAtualizacao(this.logDAO).processar(clienteSalvo);
    }

    public async inativar(id: string): Promise<void> {
        const clienteAInativar = await this.clienteDAO.buscarPorId(id);
        if (!clienteAInativar) {
            throw new Error(`Cliente com id ${id} não encontrado`);
        }

        new Inativar().processar(clienteAInativar);
        await this.clienteDAO.salvar(clienteAInativar);
    }
}