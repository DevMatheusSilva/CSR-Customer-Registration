import LogDAO from "../daos/impls/LogDAO";
import Log from "../entities/Log";

export default class LogFachada {
    private logDAO: LogDAO;

    constructor(logDAO: LogDAO) {
        this.logDAO = logDAO;
    }

    public async buscarTodos(): Promise<Log[]> {
        const logsSalvos = await this.logDAO.buscarTodos();
        return logsSalvos ? logsSalvos : [];
    }
}