import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: ['src/entities/*.ts'],
  migrations: ['src/config/database/migrations/*.ts'],
  synchronize: true
});

export async function initializeDatabase() {
  try {
    console.log("Estabelecendo conexão com o banco de dados...");
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    const mensagemErro = `Erro ao inicializar a base de dados: ${error}`
    throw new Error (mensagemErro);
  }
}