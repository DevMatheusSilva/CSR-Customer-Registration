import express from "express";
import ClienteController from "../controllers/ClienteController";
import ClienteFachada from "../fachadas/ClienteFachada";
import ClienteDAOPostgres from "../daos/impls/postgres/ClienteDAOPostgres";
import LogDAOPostgres from "../daos/impls/postgres/LogDAOPostgres";
import {postgresDataSource} from "../config/database/dataSources/postgresDataSource";

const clienteController = new ClienteController(
    new ClienteFachada(
        new ClienteDAOPostgres(postgresDataSource),
        new LogDAOPostgres(postgresDataSource),
    )
);

const roteador = (app: express.Application): void => {
    app.get("/", (_, res) => clienteController.renderizarPaginaPrincipal(_, res));
    app.get("/clientes", (_, res) => clienteController.renderizarFormularioClientes(_, res));
    app.post("/clientes", (req, res) => clienteController.criarCliente(req, res));
    app.delete("/clientes/:id", (req, res) => clienteController.inativarCliente(req, res));
}

export default roteador;