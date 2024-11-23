import express, {Request, Response} from "express";
import clienteRouter from "./ClienteRouter";
import enderecoRouter from "./EnderecoRouter";

const routes = (app: express.Application) => {
    app.get("/", (_: Request, res: Response) => {
        res.redirect("/clientes");
    });
    app.use(express.json(), clienteRouter, enderecoRouter);
}

export default routes;