import "reflect-metadata";
import app from "./app";
import { initializeDatabase } from "./config/database/dataSource";

const PORTA = 3000;

async function startServer() {
  await initializeDatabase();

  app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
  });
}

startServer().then(() => {
    console.log("Aplicação inicializada com sucesso!");
});