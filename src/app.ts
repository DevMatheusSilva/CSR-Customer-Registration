import express from "express";
import routes from "./routers/Router";
import configuracaoForm from "./config/configuracaoForm";
import configuracaoViews from "./config/configuracaoViews";
import configArquivosEstaticos from "./config/configArquivosEstaticos";

const app = express();

configArquivosEstaticos(app);
configuracaoViews(app);
configuracaoForm(app);

routes(app);

export default app;