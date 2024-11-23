import express, {Request, Response} from "express";
import ClienteController from "../controllers/ClienteController";
import ClienteFachada from "../fachadas/impls/ClienteFachada";
import EnderecoFachada from "../fachadas/impls/EnderecoFachada";
import ClienteDAO from "../daos/impls/ClienteDAO";
import LogDAO from "../daos/impls/LogDAO";
import {postgresDataSource} from "../config/database/dataSources/postgresDataSource";
import EnderecoDAO from "../daos/impls/EnderecoDAO";

const clienteController = new ClienteController(
    new ClienteFachada(
        new ClienteDAO(postgresDataSource),
        new LogDAO(postgresDataSource),
    ),
    new EnderecoFachada(
        new EnderecoDAO(postgresDataSource),
    )
);

const clienteRouter = express.Router();

clienteRouter.get("/clientes", (_: Request, res: Response) => clienteController.buscarTodos(_, res));
clienteRouter.get("/clientes/registrar", (_: Request, res: Response) => clienteController.renderizarFormularioRegistro(_, res));
clienteRouter.get("/clientes/:id", (req: Request, res: Response) => clienteController.buscarPorId(req, res));
clienteRouter.post("/clientes/registrar", (req: Request, res: Response) => clienteController.criarCliente(req, res));
clienteRouter.put("/clientes/:id", (req: Request, res: Response) => clienteController.atualizarCliente(req, res));
clienteRouter.delete("/clientes/:id", (req: Request, res: Response) => clienteController.inativarCliente(req, res));

export default clienteRouter;