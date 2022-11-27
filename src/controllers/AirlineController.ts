import {Airline} from "../models/Airline";
import {Request, Response} from "express";
import {AppDataSource} from "../../db";

exports.getAirlines = async function (req: Request, res: Response) {
    console.log(req);
    const allAirlines = await AppDataSource.getRepository(Airline).find({
        relations: {
            planes: true
        }
    });
    res.json(allAirlines);
}

exports.getAirlineById = async function (req: Request, res: Response) {
    const airline = await AppDataSource.getRepository(Airline).findOne({
        where: {
            id: +req.params.id,
        },
        relations: {
            planes: true,
        }
    })
    if (!airline) res.sendStatus(404);
    else res.json(airline);
}

exports.createAirline = async function (req: Request, res: Response) {
    const checkUnique = await AppDataSource.getRepository(Airline).findOneBy({ // Проверка авиакомпании на уникальность
        nameOfAirline: req.body.nameOfAirline
    })
    if (checkUnique) {
        res.status(400).json({msg: "Авиакомпания с таким названием уже существует"})
        return;
    }
    const airline = new Airline();
    airline.nameOfAirline = req.body.nameOfAirline;
    airline.office = req.body.office;
    const result = await AppDataSource.getRepository(Airline).save(airline)
    res.json(result);
}

exports.updateAirline = async function (req: Request, res: Response) {
    const airline = await AppDataSource.getRepository(Airline).findOneBy({
        id: +req.params.id,
    });
    if (airline) {
        const checkUnique = await AppDataSource.getRepository(Airline).findOneBy({ // Проверка авиакомпании на уникальность
            nameOfAirline: req.body.nameOfAirline
        })
        if (checkUnique && (airline.nameOfAirline !== req.body.nameOfAirline)) {
            res.status(400).json({msg: "Авиакомпания с таким названием уже существует"})
            return;
        }
        AppDataSource.getRepository(Airline).merge(airline, req.body);
        res.json(await AppDataSource.getRepository(Airline).save(airline));
    } else res.sendStatus(404);
}

exports.deleteAirline = async function (req: Request, res: Response) {
    const airline = await AppDataSource.getRepository(Airline).findOneBy({
        id: +req.params.id
    })
    if (airline) {
        await AppDataSource.getRepository(Airline).delete(airline);
        res.json(airline);
    } else res.sendStatus(404);
}

