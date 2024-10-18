import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.EXTERNAL_HOST,
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/entities/*.ts'],
  migrations: ['src/config/database/migrations/*.ts']
});

export async function initializeDatabase() {
  try {
    console.log("Estabelecendo conexão com o banco de dados...");
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    const mensagemErro = `Erro ao inicializar a base de dados: ${error}`
    console.error(mensagemErro);
    throw new Error (mensagemErro);
  }
}