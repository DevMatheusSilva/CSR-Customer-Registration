import {Request, Response} from 'express';
import LogFachada from "../fachadas/LogFachada";

export default class LogController {
    private fachada: LogFachada;

    constructor(fachada: LogFachada) {
        this.fachada = fachada;
    }

    public async buscarTodos(_: Request, res: Response) {
        try {
            const logs = await this.fachada.buscarTodos();
            res.status(200).render("visualizarLogs", {logs});
        } catch (error) {
            const err = error as Error;
            res.status(500).render("error", {message: err.message});
        }
    }
}