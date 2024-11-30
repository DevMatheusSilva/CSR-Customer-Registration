import express, {Request, Response} from "express";
import ClienteController from "../../controllers/ClienteController";
import ClienteFachada from "../../fachadas/ClienteFachada";
import ClienteDAO from "../../daos/impls/ClienteDAO";
import LogDAO from "../../daos/impls/LogDAO";
import {postgresDataSource} from "../../config/database/dataSources/postgresDataSource";
import UsuarioController from "../../controllers/UsuarioController";
import UsuarioFachada from "../../fachadas/UsuarioFachada";
import UsuarioDAO from "../../daos/impls/UsuarioDAO";
import EnderecoController from "../../controllers/EnderecoController";
import EnderecoFachada from "../../fachadas/EnderecoFachada";
import EnderecoDAO from "../../daos/impls/EnderecoDAO";

const clienteRouter = express.Router();

const clienteController = new ClienteController(
    new UsuarioController(
        new UsuarioFachada(
            new UsuarioDAO(postgresDataSource),
            new ClienteDAO(postgresDataSource),
            new LogDAO(postgresDataSource),
        )
    ),
    new EnderecoController(
        new EnderecoFachada(
            new EnderecoDAO(postgresDataSource),
            new ClienteDAO(postgresDataSource),
            new LogDAO(postgresDataSource),
        )
    ),
    new ClienteFachada(
        new ClienteDAO(postgresDataSource),
        new LogDAO(postgresDataSource),
    ),
);

clienteRouter.get("/clientes", (_: Request, res: Response) => clienteController.buscarTodos(_, res));

clienteRouter.get("/clientes/registrar", (_: Request, res: Response) => clienteController.renderizarFormularioRegistro(_, res));
clienteRouter.post("/clientes/registrar", (req: Request, res: Response) => clienteController.criarCliente(req, res));

clienteRouter.get("/clientes/:id/editar", (req: Request, res: Response) => clienteController.renderizarFormularioEdicao(req, res));
clienteRouter.put("/clientes/:id/editar", (req: Request, res: Response) => clienteController.atualizarCliente(req, res));

clienteRouter.get("/clientes/filtrar", (req: Request, res: Response) => clienteController.buscarTodos(req, res));

clienteRouter.get("/clientes/:id", (req: Request, res: Response) => clienteController.renderizarFormularioVisualizacao(req, res));

clienteRouter.delete("/clientes/:id", (req: Request, res: Response) => clienteController.inativarCliente(req, res));

export default clienteRouter;