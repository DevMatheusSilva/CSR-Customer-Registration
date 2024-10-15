import express from "express";
import ClienteController from "../ClienteController";

const clienteController = new ClienteController();

const roteador = (app: express.Application): void => {
  app.get("/", (_, res) => clienteController.renderizarPaginaPrincipal(_, res));
  app.get("/clientes", (_, res) => clienteController.renderizarFormularioClientes(_, res));
  app.post("/clientes", (req, res) => clienteController.criarCliente(req, res));
}

export default roteador;