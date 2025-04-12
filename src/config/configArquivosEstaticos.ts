import express from "express";
import path from "path";

const configArquivosEstaticos = (app: express.Application) => {
    app.use(express.static(path.resolve(__dirname, "../../public")));
}

export default configArquivosEstaticos;
