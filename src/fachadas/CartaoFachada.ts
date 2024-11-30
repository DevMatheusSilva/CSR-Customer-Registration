import IStrategy from "../strategies/IStrategy";
import Cartao from "../entities/Cartao";
import CartaoDAO from "../daos/impls/CartaoDAO";
import ValidarNumero from "../strategies/impls/CartaoImpls/ValidarNumero";
import ValidarCvv from "../strategies/impls/CartaoImpls/ValidarCvv";
import DefinirBandeira from "../strategies/impls/CartaoImpls/DefinirBandeira";
import ValidarCartaoPreferencial from "../strategies/impls/CartaoImpls/ValidarCartaoPreferencial";
import ClienteDAO from "../daos/impls/ClienteDAO";
import GerarLogCriacao from "../strategies/impls/LogImpls/GerarLogCriacao";
import LogDAO from "../daos/impls/LogDAO";

export default class CartaoFachada {
    private cartaoDAO: CartaoDAO;
    private clienteDAO: ClienteDAO;
    private logDAO: LogDAO;
    private validacoesCartao: IStrategy[];

    constructor(cartaoDAO: CartaoDAO, clienteDAO: ClienteDAO, logDAO: LogDAO) {
        this.cartaoDAO = cartaoDAO;
        this.clienteDAO = clienteDAO;
        this.logDAO = logDAO;
        this.validacoesCartao = [new ValidarNumero(), new ValidarCvv()];
    }

    public async salvar(cartoes: Cartao[], idCliente: string): Promise<Cartao[]> {
        const cliente = await this.clienteDAO.buscarPorId(idCliente);
        if (!cliente) {
            throw new Error(`Cliente com o id ${idCliente} não encontrado`);
        }

        cartoes.forEach(cartao => {
            new DefinirBandeira().processar(cartao);
            this.validacoesCartao.forEach(validacao => validacao.processar(cartao));
            cartao.cliente = cliente;
            cliente.cartoes.push(cartao);
        });

        new ValidarCartaoPreferencial().processar(cliente.cartoes);

        const clienteSalvo = await this.clienteDAO.salvar(cliente);
        clienteSalvo.cartoes.forEach(cartao => new GerarLogCriacao(this.logDAO).processar(cartao));
        return await this.cartaoDAO.salvar(clienteSalvo.cartoes);
    }
}
