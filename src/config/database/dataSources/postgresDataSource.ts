import {DataSource} from "typeorm";

export const postgresDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: ['src/entities/*.ts', 'src/entities/Entidade.ts'],
    migrations: ['src/config/database/migrations/*.ts'],
    migrationsRun: false,
    logging: false,
    synchronize: true
});