import {DataSource} from "typeorm";
import {Flight} from "./src/models/Flight";
import {Airline} from "./src/models/Airline";
import {Ticket} from "./src/models/Ticket";
import {User} from "./src/models/User";
import {Plane} from "./src/models/Plane";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "WOLTER\\SQLEXPRESS01",
    port: 5432,
    username: "admin",
    password: "password",
    database: "airportDB",
    entities: [Flight, Airline, Plane, Ticket, User],
    synchronize: true,
    options: {
        // @ts-ignore
        trustServerCertificate: true,
    },
});
