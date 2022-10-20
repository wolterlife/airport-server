import "reflect-metadata"
import {AppDataSource} from "./db";
const express = require('express');
const router = require('./src/router')
const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/", router)

AppDataSource.initialize() // init db
    .then(() => {
        console.log('DataBase init!');
    })
    .catch((error) => console.log(error));

app.listen(port, () => {console.log(`App listen on port ${port}!`)})
