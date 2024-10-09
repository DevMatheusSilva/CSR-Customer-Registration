import express from "express";
import roteador from "./controllers/roteador/roteador";
import arquivosEstaticos from "./controllers/middlewares/arquivosEstaticos";
import configuracaoForm from "./controllers/middlewares/configuracaoForm";
import configuracaoViews from "./controllers/middlewares/configuracaoViews";

const app = express();

app.use(express.json());
app.use(arquivosEstaticos);

configuracaoViews(app);
configuracaoForm(app);
roteador(app);

export default app;