"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_controller_1 = __importDefault(require("./customer.controller"));
const customerController = new customer_controller_1.default();
const routes = (app) => {
    app.get("/", (_, res) => customerController.renderHomePage(_, res));
    app.get("/customers", (_, res) => customerController.renderCustomersForm(_, res));
    app.post("/customers", (req, res) => customerController.defineCustomer(req, res));
};
exports.default = routes;
