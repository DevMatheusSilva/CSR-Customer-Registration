"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const ConexaoTypeORM_1 = __importDefault(require("./config/database/ConexaoTypeORM"));
const postgresDataSource_1 = require("./config/database/dataSources/postgresDataSource");
const PORTA = 3000;
async function startServer() {
    await ConexaoTypeORM_1.default.conectar(postgresDataSource_1.postgresDataSource);
    app_1.default.listen(PORTA, () => {
        console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
    });
}
startServer().then(() => {
    console.log("Aplicação inicializada com sucesso!");
});
