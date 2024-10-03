import express from "express";
import CustomerController from "../customer.controller";

const customerController = new CustomerController();

const routes = (app: express.Application): void => {
  app.get("/", (_, res) => customerController.renderizarPaginaPrincipal(_, res));
  app.get("/customers", (_, res) => customerController.renderizarFormularioClientes(_, res));
  app.post("/customers", (req, res) => customerController.salvar(req, res));
}

export default routes;