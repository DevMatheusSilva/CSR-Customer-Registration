import {Router, Request, Response} from "express";
import CartaoController from "../../controllers/CartaoController";
import CartaoFachada from "../../fachadas/CartaoFachada";
import CartaoDAO from "../../daos/impls/CartaoDAO";
import {postgresDataSource} from "../../config/database/dataSources/postgresDataSource";
import ClienteDAO from "../../daos/impls/ClienteDAO";
import LogDAO from "../../daos/impls/LogDAO";

const cartaoController = new CartaoController(
    new CartaoFachada(
        new CartaoDAO(postgresDataSource),
        new ClienteDAO(postgresDataSource),
        new LogDAO(postgresDataSource),
    )
)

const cartaoRouter = Router();

cartaoRouter.get("/clientes/:id/cartoes/registrar", (req: Request, res: Response) => cartaoController.renderizarFormularioCriacao(req, res));
cartaoRouter.post("/clientes/:id/cartoes/registrar", (req: Request, res: Response) => cartaoController.criarCartao(req, res));

export default cartaoRouter;