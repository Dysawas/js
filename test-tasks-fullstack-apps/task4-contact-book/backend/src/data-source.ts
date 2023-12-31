import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "test",
    synchronize: false,
    logging: false,
    entities: ["src/models/*{.ts,.js}"],
    migrations: ["src/migrations/*{.ts,.js}"],
    subscribers: [],
   
})
