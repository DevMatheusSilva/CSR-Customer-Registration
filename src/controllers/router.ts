import express from "express";
import CustomerController from "./customer.controller";

const customerController = new CustomerController();

const routes = (app: express.Application): void => {
  app.get("/", (_, res) => customerController.renderHomePage(_, res));
  app.get("/customers", (_, res) => customerController.renderCustomersForm(_, res));
  app.post("/customers", (req, res) => customerController.defineCustomer(req, res));
}

export default routes;