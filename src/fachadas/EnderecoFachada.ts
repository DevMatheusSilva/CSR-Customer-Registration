import Endereco from "../entities/Endereco";
import EnderecoDAO from "../daos/impls/EnderecoDAO";
import ClienteDAO from "../daos/impls/ClienteDAO";
import logDAO from "../daos/impls/LogDAO";
import IStrategy from "../strategies/IStrategy";
import ValidarCep from "../strategies/impls/EnderecoImpls/ValidarCep";
import ValidarNumero from "../strategies/impls/CartaoImpls/ValidarNumero";
import ValidarSigla from "../strategies/impls/EnderecoImpls/ValidarSigla";
import ValidarTiposEndereco from "../strategies/impls/EnderecoImpls/ValidarTiposEndereco";
import Atualizar from "../strategies/impls/ClienteImpls/Atualizar";
import GerarLogAtualizacao from "../strategies/impls/LogImpls/GerarLogAtualizacao";
import GerarLogCriacao from "../strategies/impls/LogImpls/GerarLogCriacao";

export default class EnderecoFachada {
    private enderecoDAO: EnderecoDAO;
    private clienteDAO: ClienteDAO;
    private logDAO: logDAO;
    private validacoesEndereco: IStrategy[];

    constructor(enderecoDAO: EnderecoDAO, clienteDAO: ClienteDAO, logDAO: logDAO) {
        this.enderecoDAO = enderecoDAO;
        this.clienteDAO = clienteDAO;
        this.logDAO = logDAO;
        this.validacoesEndereco = [new ValidarCep(), new ValidarNumero(), new ValidarSigla()];
    }

    public async salvar(enderecos: Endereco[], idCliente: string): Promise<Endereco[]> {
        const cliente = await this.clienteDAO.buscarPorId(idCliente);
        if (!cliente) {
            throw new Error(`Cliente com o id ${idCliente} não encontrado`);
        }

        enderecos.forEach(endereco => {
            this.validacoesEndereco.forEach(validacao => validacao.processar(endereco));
            endereco.cliente = cliente;
            cliente.enderecos.push(endereco);
        });


        new ValidarTiposEndereco().processar(cliente.enderecos);

        const clienteSalvo = await this.clienteDAO.salvar(cliente);

        enderecos.forEach(
            endereco => new GerarLogCriacao(this.logDAO).processar(endereco)
        );
        return await this.enderecoDAO.salvar(clienteSalvo.enderecos);
    }

    public async buscarTodos(idCliente: string): Promise<Endereco[]> {
        const enderecosEncontrados = await this.enderecoDAO.buscarTodos(idCliente);
        if (!enderecosEncontrados) {
            throw new Error(`Endereços pertencentes ao cliente com o id ${idCliente} não encontrados`);
        }
        return enderecosEncontrados;
    }

    public async atualizar(idCliente: string, enderecosAtualizados: Endereco[]) {
        const cliente = await this.clienteDAO.buscarPorId(idCliente);
        if (!cliente) {
            throw new Error(`Cliente com o id ${idCliente} não encontrado`);
        }

        new ValidarTiposEndereco().processar(enderecosAtualizados);
        this.validacoesEndereco.forEach(
            validacao => enderecosAtualizados.forEach(
                endereco => validacao.processar(endereco)
            )
        );

        cliente.enderecos.forEach((endereco, index) => {
            endereco.novosDados = enderecosAtualizados[index];
            new Atualizar().processar(endereco);
        });

        const clienteSalvo = await this.clienteDAO.salvar(cliente);

        clienteSalvo.enderecos.forEach(
            endereco => new GerarLogAtualizacao(this.logDAO).processar(endereco)
        );
        await this.enderecoDAO.salvar(clienteSalvo.enderecos);
    }
}