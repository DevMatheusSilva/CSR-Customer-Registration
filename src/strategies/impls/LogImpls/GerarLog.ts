import IStrategy from "../../IStrategy";
import path from "path";
import fs from "fs";
import Entidade from "../../../entities/Entidade";
import Log from "../../../entities/Log";
import LogDAOPostgres from "../../../daos/impls/postgres/LogDAOPostgres";
import Usuario from "../../../entities/Usuario";

export default class GerarLog implements IStrategy {
    private logDAO: LogDAOPostgres;

    constructor(logDAO: LogDAOPostgres) {
        this.logDAO = logDAO;
    }

    public async processar(entidade: Entidade) {
        if (entidade instanceof Usuario) {
            const logSalvo = await this.logDAO.salvar(new Log(entidade));
            const logPath = path.resolve(__dirname, "../../../logs/criacaoUsuarioLog.txt");
            const mensagemLog = `O usuário foi criado com sucesso em ${logSalvo.dataEHora}`;
            console.log(mensagemLog);
            fs.appendFileSync(logPath, mensagemLog);
        }
    }
}