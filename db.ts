import {DataSource} from "typeorm";
import {Flight} from "./models/flight";

export const AppDataSource = new DataSource({
    // @ts-ignore
    location: "", region: "", resourceArn: "", secretArn: "",
    driver: "mssql",
    type: "mssql",
    host: 'WOLTER\\SQLEXPRESS01',
    user: 'admin',
    password: 'password',
    database: 'airportDB',
    entities: [
        __dirname + '/../**/models/flight.ts'
    ],
    trustServerCertificate: true
});
