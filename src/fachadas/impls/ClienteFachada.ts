import IFachada from "../IFachada";
import Cliente from "../../entities/Cliente";
import ClienteDAO from "../../daos/impls/ClienteDAO";
import ValidarCep from "../../strategies/impls/EnderecoImpls/ValidarCep";
import ValidarNumero from "../../strategies/impls/CartaoImpls/ValidarNumero";
import ValidarSigla from "../../strategies/impls/EnderecoImpls/ValidarSigla";
import ValidarCvv from "../../strategies/impls/CartaoImpls/ValidarCvv";
import ValidarDdd from "../../strategies/impls/TelefoneImpls/ValidarDdd";
import ValidarSenha from "../../strategies/impls/UsuarioImpls/ValidarSenha";
import ValidarCpf from "../../strategies/impls/UsuarioImpls/ValidarCpf";
import CriptografarSenha from "../../strategies/impls/UsuarioImpls/CriptografarSenha";
import LogDAO from "../../daos/impls/LogDAO";
import GerarLogCriacao from "../../strategies/impls/LogImpls/GerarLogCriacao";
import Inativar from "../../strategies/impls/ClienteImpls/Inativar";
import ValidarEmail from "../../strategies/impls/UsuarioImpls/ValidarEmail";
import GerarLogInativacao from "../../strategies/impls/LogImpls/GerarLogInativacao";
import DefinirBandeira from "../../strategies/impls/CartaoImpls/DefinirBandeira";

export default class ClienteFachada implements IFachada {
    private clienteDAO: ClienteDAO;
    private logDAO: LogDAO;

    constructor(clienteDAO: ClienteDAO, logDAO: LogDAO) {
        this.clienteDAO = clienteDAO;
        this.logDAO = logDAO;
    }

    public async salvar(cliente: Cliente): Promise<Cliente> {
        // Validação dados telefone
        new ValidarNumero().processar(cliente.telefone);
        new ValidarDdd().processar(cliente.telefone);

        // Validação dos dados do endereço
        for (const endereco of cliente.enderecos) {
            new ValidarCep().processar(endereco);
            new ValidarNumero().processar(endereco);
            new ValidarSigla().processar(endereco.pais);
        }

        // Validação dos dados do cartão
        for (const cartao of cliente.cartoes) {
            await new DefinirBandeira().processar(cartao);
            new ValidarNumero().processar(cartao);
            new ValidarCvv().processar(cartao);
        }

        // Validação dos dados do usuário
        new ValidarEmail().processar(cliente.usuario);
        new ValidarSenha().processar(cliente.usuario);
        new ValidarCpf().processar(cliente.usuario);
        new CriptografarSenha().processar(cliente.usuario);

        const clienteSalvo = await this.clienteDAO.salvar(cliente);
        await new GerarLogCriacao(this.logDAO).processar(cliente.usuario);

        return clienteSalvo;
    }

    public async buscarTodos(): Promise<Cliente[]> {
        const clientes = await this.clienteDAO.buscarTodos();
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
        const clienteParaAtualizar = await this.clienteDAO.buscarPorId(id);
        if (!clienteParaAtualizar) {
            throw new Error(`Cliente com id ${id} não encontrado`);
        }

        if (clienteAtualizado.usuario.nome !== clienteParaAtualizar.usuario.nome) {
            clienteParaAtualizar.usuario.nome = clienteAtualizado.usuario.nome;
        }

        if (clienteAtualizado.usuario.cpf !== clienteParaAtualizar.usuario.cpf) {
            clienteParaAtualizar.usuario.cpf = clienteAtualizado.usuario.cpf;
        }

        await this.clienteDAO.atualizarRegistro(clienteParaAtualizar);
    }

    public async inativar(id: string): Promise<void> {
        const clienteAInativar = await this.clienteDAO.buscarPorId(id);
        if (!clienteAInativar) {
            throw new Error(`Cliente com id ${id} não encontrado`);
        }
        new Inativar().processar(clienteAInativar);
        await this.clienteDAO.atualizarRegistro(clienteAInativar);
        await new GerarLogInativacao(this.logDAO).processar(clienteAInativar);
    }
}