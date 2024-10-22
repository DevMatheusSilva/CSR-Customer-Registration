import { DataSource } from "typeorm";

export const postgresDataSource: DataSource = new DataSource({
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