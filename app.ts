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

//TODO :[X] Расчёт свободных мест
//            [X]  ticket при создании должен flight.freePlaces - 1 !
//            [X]  При создании рейса кол-во свободных мест должно равняться полю самолёта
//      [X] Проверка на уникальность там где надо (пройтись по роутеру)
//      [ ] Проверка при создании на существование других объектов?
//      [ ] Проверка на пустые поля?
//      [X] Проверка является ли самолёт частью авиакомпании при создании/изменении рейса. Делать ли подобные проверки на бэке или чисто на фронте?
//      [ ] Проверки при удалении на каскадность
//
