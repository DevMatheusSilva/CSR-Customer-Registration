import express, {Request, Response} from "express";
import EnderecoController from "../controllers/EnderecoController";
import EnderecoFachada from "../fachadas/impls/EnderecoFachada";
import EnderecoDAO from "../daos/impls/EnderecoDAO";
import {postgresDataSource} from "../config/database/dataSources/postgresDataSource";

const enderecoController = new EnderecoController(
    new EnderecoFachada(
        new EnderecoDAO(postgresDataSource)
    )
);

const enderecoRouter = express.Router();

enderecoRouter.get("/enderecos/:id", (req: Request, res: Response) => enderecoController.renderizarFormularioEdicao(req, res));

export default enderecoRouter;