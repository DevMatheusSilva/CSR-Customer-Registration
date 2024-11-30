import {Router, Request, Response} from "express";
import LogController from "../../controllers/LogController";
import LogFachada from "../../fachadas/LogFachada";
import LogDAO from "../../daos/impls/LogDAO";
import {postgresDataSource} from "../../config/database/dataSources/postgresDataSource";

const controller = new LogController(
    new LogFachada(
        new LogDAO(postgresDataSource)
    )
);

const logRouter = Router();

logRouter.get("/transacoes", async (req: Request, res: Response) => {
    await controller.buscarTodos(req, res);
});

export default logRouter;