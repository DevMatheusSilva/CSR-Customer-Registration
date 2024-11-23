import IStrategy from "../../IStrategy";
import Entidade from "../../../entities/Entidade";
import Log from "../../../entities/Log";
import LogDAO from "../../../daos/impls/LogDAO";
import Usuario from "../../../entities/Usuario";
import TipoLog from "../../../enums/TipoLog";

export default class GerarLogCriacao implements IStrategy {
    private logDAO: LogDAO;

    constructor(logDAO: LogDAO) {
        this.logDAO = logDAO;
    }

    public async processar(entidade: Entidade) {
        if (entidade instanceof Usuario) {
            const logSalvo = await this.logDAO.salvar(new Log(entidade, TipoLog.CRIACAO));
            console.log(`O usuário ${logSalvo.usuario.nome} foi criado com sucesso em ${logSalvo.dataEHora}`);
        }
    }
}