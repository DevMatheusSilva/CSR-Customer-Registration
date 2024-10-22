import "reflect-metadata";
import app from "./app";
import ConexaoTypeORM from "./config/database/ConexaoTypeORM";
import { postgresDataSource } from "./config/database/dataSources/postgresDataSource";

const PORTA = 3000;

async function startServer() {
  await ConexaoTypeORM.conectar(postgresDataSource);

  app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
  });
}

startServer().then(() => {
    console.log("Aplicação inicializada com sucesso!");
});