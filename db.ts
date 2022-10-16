import {DataSource} from "typeorm";
import {Flight} from "./src/models/Flight";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "airport_woltersDB",
    synchronize: true,
    logging: true,
    entities: [Flight],
    subscribers: [],
    migrations: [],
});
