import IFachada from "./IFachada";
import Cliente from "../entities/Cliente";
import ClienteDAOPostgres from "../daos/impls/postgres/ClienteDAOPostgres";
import ValidarCep from "../strategies/impls/EnderecoImpls/ValidarCep";
import ValidarNumero from "../strategies/impls/CartaoImpls/ValidarNumero";
import ValidarSigla from "../strategies/impls/EnderecoImpls/ValidarSigla";
import ValidarCvv from "../strategies/impls/CartaoImpls/ValidarCvv";
import ValidarDdd from "../strategies/impls/TelefoneImpls/ValidarDdd";
import ValidarSenha from "../strategies/impls/UsuarioImpls/ValidarSenha";
import ValidarCpf from "../strategies/impls/ClienteImpls/ValidarCpf";
import CriptografarSenha from "../strategies/impls/UsuarioImpls/CriptografarSenha";
import LogDAOPostgres from "../daos/impls/postgres/LogDAOPostgres";
import GerarLog from "../strategies/impls/LogImpls/GerarLog";

export default class ClienteFachada implements IFachada {
    private clienteDAO: ClienteDAOPostgres;
    private logDAO: LogDAOPostgres;

    constructor(clienteDAO: ClienteDAOPostgres, logDAO: LogDAOPostgres) {
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
            new ValidarNumero().processar(cartao);
            new ValidarCvv().processar(cartao);
        }

        // Validação dos dados do usuário
        new ValidarSenha().processar(cliente.usuario);
        new ValidarCpf().processar(cliente.usuario);
        new CriptografarSenha().processar(cliente.usuario);

        const clienteSalvo = await this.clienteDAO.salvar(cliente);
        await new GerarLog(this.logDAO).processar(cliente.usuario);

        return clienteSalvo;
    }
}