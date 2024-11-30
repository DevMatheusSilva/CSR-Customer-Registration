import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import Log from "../../../entities/Log";
import LogDAO from "../../../daos/impls/LogDAO";
import TipoLog from "../../../enums/TipoLog";
import Cliente from "../../../entities/Cliente";
import Endereco from "../../../entities/Endereco";
import Cartao from "../../../entities/Cartao";

export default class GerarLogCriacao implements IStrategy {
    private logDAO;

    constructor(logDAO: LogDAO) {
        this.logDAO = logDAO;
    }

    public async processar(entidade: Entidade) {
        if (entidade instanceof Cliente) {
            const logSalvo = await this.logDAO.salvar(
                new Log(entidade.id, "Cliente", TipoLog.CRIACAO_CLIENTE)
            );
            console.log(`O usuário ${entidade.usuario.nome} foi criado com sucesso em ${logSalvo.dataEHora}`);
        }

        if (entidade instanceof Endereco) {
            const logSalvo = await this.logDAO.salvar(
                new Log(entidade.id, "Endereco", TipoLog.CRIACAO_ENDERECO)
            );
            console.log(`O endereço '${entidade.fraseCurta}' foi criado com sucesso em ${logSalvo.dataEHora}`);
        }

        if (entidade instanceof Cartao) {
            const logSalvo = await this.logDAO.salvar(
                new Log(entidade.id, "Cartao", TipoLog.CRIACAO_CARTAO)
            );
            console.log(`O cartão foi criado com sucesso em ${logSalvo.dataEHora}`);
        }
    }
}