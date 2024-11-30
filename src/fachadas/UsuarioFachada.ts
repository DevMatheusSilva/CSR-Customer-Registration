import LogDAO from "../daos/impls/LogDAO";
import UsuarioDAO from "../daos/impls/UsuarioDAO";
import ValidarSenha from "../strategies/impls/UsuarioImpls/ValidarSenha";
import Usuario from "../entities/Usuario";
import ClienteDAO from "../daos/impls/ClienteDAO";
import CriptografarSenha from "../strategies/impls/UsuarioImpls/CriptografarSenha";
import GerarLogAtualizacao from "../strategies/impls/LogImpls/GerarLogAtualizacao";

export default class UsuarioFachada {
    private usuarioDAO: UsuarioDAO;
    private clienteDAO: ClienteDAO;
    private logDAO: LogDAO;

    constructor(usuarioDAO: UsuarioDAO, clienteDAO: ClienteDAO, logDAO: LogDAO) {
        this.usuarioDAO = usuarioDAO;
        this.clienteDAO = clienteDAO;
        this.logDAO = logDAO;
    }

    public async atualizar(idCliente: string, usuario: Usuario) {
        const clienteSalvo = await this.clienteDAO.buscarPorId(idCliente);
        if (!clienteSalvo) {
            throw new Error("Cliente não encontrado");
        }
        const usuarioSalvo = clienteSalvo.usuario;

        new ValidarSenha().processar(usuario);
        new CriptografarSenha().processar(usuario);

        usuarioSalvo.senha = usuario.senha;

        await new GerarLogAtualizacao(this.logDAO).processar(usuarioSalvo);
        await this.usuarioDAO.salvar(usuarioSalvo);
    }
}