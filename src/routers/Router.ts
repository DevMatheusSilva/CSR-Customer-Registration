import express, {Request, Response} from "express";
import clienteRouter from "./Routes/ClienteRouter";
import enderecoRouter from "./Routes/EnderecoRouter";
import cartaoRouter from "./Routes/CartaoRouter";
import usuarioRouter from "./Routes/UsuarioRouter";
import logRouter from "./Routes/LogRouter";

const routes = (app: express.Application) => {
    app.get("/", (_: Request, res: Response) => {
        res.redirect("/clientes");
    });
    app.use(express.json(), clienteRouter, enderecoRouter, cartaoRouter, usuarioRouter, logRouter);
}

export default routes;