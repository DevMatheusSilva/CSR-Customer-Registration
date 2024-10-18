import "reflect-metadata";
import "dotenv/config";
import express from "express";
import roteador from "./roteador/roteador";
import arquivosEstaticos from "./middlewares/arquivosEstaticos";
import configuracaoForm from "./config/configuracaoForm";
import configuracaoViews from "./config/configuracaoViews";

const app = express();

app.use(express.json());
app.use(arquivosEstaticos);

configuracaoViews(app);
configuracaoForm(app);
roteador(app);

export default app;