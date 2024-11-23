import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import LogDAO from "../../../daos/impls/LogDAO";
import Usuario from "../../../entities/Usuario";
import Log from "../../../entities/Log";
import TipoLog from "../../../enums/TipoLog";

export default class GerarLogInativacao implements IStrategy {
    private logDAO: LogDAO;

    constructor(logDAO: LogDAO) {
        this.logDAO = logDAO;
    }

    async processar(entidade: Entidade) {
        if (entidade instanceof Usuario) {
            const logSalvo = await this.logDAO.salvar(new Log(entidade, TipoLog.INATIVACAO_CLIENTE));
            console.log(`O usuário ${logSalvo.usuario.nome} foi inativado com sucesso em ${logSalvo.dataEHora}`);
        }
    }
}