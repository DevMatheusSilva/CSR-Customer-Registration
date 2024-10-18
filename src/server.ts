import app from "./app";
import { initializeDatabase } from "./config/database/dataSource";

const PORTA = process.env.PORTA;

async function startServer() {
  await initializeDatabase();

  app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
  });
}

startServer();