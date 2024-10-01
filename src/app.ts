import express from "express";
import CustomerController from "./controllers/customer.controller";
import expressStaticSetUp from "./controllers/middlewares/expressStaticSetup";
import configureExpressForm from "./controllers/middlewares/expressFormSetup";
import viewConfig from "./controllers/middlewares/expressViewsSetup";

const app = express();

app.use(express.json());
app.use(expressStaticSetUp);

viewConfig(app);
configureExpressForm(app);

new CustomerController(app);

export default app;