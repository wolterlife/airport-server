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
        console.log('DataBase is connected!');
    })
    .catch((error) => console.log(error));

app.listen(port, () => {console.log(`App listen on port ${port}!`)})

//TODO :[ ] Расчёт свободных мест
//      [ ] Проверка на уникальность там где надо (пройтись по роутеру)
//      [ ] Проверка является ли самолёт частью авиакомпании при создании рейса
//      [ ] Проверки при удалении на каскадность
