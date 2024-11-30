import {Router, Request, Response} from "express";
import UsuarioController from "../../controllers/UsuarioController";
import LogDAO from "../../daos/impls/LogDAO";
import {postgresDataSource} from "../../config/database/dataSources/postgresDataSource";
import UsuarioDAO from "../../daos/impls/UsuarioDAO";
import UsuarioFachada from "../../fachadas/UsuarioFachada";
import ClienteDAO from "../../daos/impls/ClienteDAO";

const controller = new UsuarioController(
    new UsuarioFachada(
        new UsuarioDAO(postgresDataSource),
        new ClienteDAO(postgresDataSource),
        new LogDAO(postgresDataSource),
    ),
);

const usuarioRouter = Router();

usuarioRouter.get("/clientes/:id/usuarios/alterarSenha", (req: Request, res: Response) => controller.renderizarFormularioAlterarSenha(req, res));
usuarioRouter.post("/clientes/:id/usuarios/alterarSenha", (req: Request, res: Response) => controller.alterarSenha(req, res));

export default usuarioRouter;