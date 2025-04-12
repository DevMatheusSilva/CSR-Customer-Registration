import express, {Request, Response} from "express";
import EnderecoController from "../../controllers/EnderecoController";
import EnderecoFachada from "../../fachadas/EnderecoFachada";
import EnderecoDAO from "../../daos/impls/EnderecoDAO";
import {postgresDataSource} from "../../config/database/dataSources/postgresDataSource";
import ClienteDAO from "../../daos/impls/ClienteDAO";
import LogDAO from "../../daos/impls/LogDAO";

const enderecoController = new EnderecoController(
    new EnderecoFachada(
        new EnderecoDAO(postgresDataSource),
        new ClienteDAO(postgresDataSource),
        new LogDAO(postgresDataSource)
    )
);

const enderecoRouter = express.Router();

enderecoRouter.get("/clientes/:id/enderecos/registrar", (req: Request, res: Response) => enderecoController.renderizarFormularioCriacao(req, res));
enderecoRouter.post("/clientes/:id/enderecos/registrar", (req: Request, res: Response) => enderecoController.criarEndereco(req, res));

enderecoRouter.get("/clientes/:id/enderecos/editar", (req: Request, res: Response) => enderecoController.renderizarFormularioEdicao(req, res));
enderecoRouter.post("/clientes/:id/enderecos/editar", (req: Request, res: Response) => enderecoController.atualizarEndereco(req, res));

export default enderecoRouter;