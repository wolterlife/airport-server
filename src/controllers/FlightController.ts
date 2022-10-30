import {AppDataSource} from "../../db";

const {Flight} = require("../models/Flight");
import {Request, Response} from "express";
import {Airline} from "../models/Airline";
import {Plane} from "../models/Plane";

exports.getFlights = async function (req: Request, res: Response) {
    const flights = await AppDataSource
        .getRepository(Flight)
        .createQueryBuilder("flight")
        .leftJoinAndSelect("flight.airline", "airline")
        .leftJoinAndSelect("flight.plane", "plane")
        .getMany()
    res.json(flights)
}

exports.getFlightById = async function (req: Request, res: Response) {
    const flight = await AppDataSource
        .getRepository(Flight)
        .createQueryBuilder("flight")
        .where("flight.id = :id", {id: +req.params.id})
        .leftJoinAndSelect("flight.airline", "airline")
        .leftJoinAndSelect("flight.plane", "plane")
        .getOne()
    if (flight) res.json(flight)
    else res.sendStatus(404);
}

exports.updateFlight = async function (req: Request, res: Response) { // !
    const flight = await AppDataSource
        .getRepository(Flight)
        .createQueryBuilder("flight")
        .where("flight.id = :id", {id: +req.params.id})
        .getOne()
    if (!flight) { // Существует ли рейс
        res.status(404).json({msg: "Указанный рейс не найден"})
        return
    }

    AppDataSource.getRepository(Flight).merge(flight, req.body)
    res.json(await AppDataSource.getRepository(Flight).save(flight));
}

exports.deleteFlight = async function (req: Request, res: Response) {
    const flight = await AppDataSource
        .getRepository(Flight)
        .createQueryBuilder("flight")
        .where("flight.id = :id", {id: +req.params.id})
        .getOne()
    if (flight) {
        await AppDataSource.getRepository(Flight).delete(flight);
        res.json(flight);
    } else res.sendStatus(404);
}

exports.createFlight = async function (req: Request, res: Response) {
    const flight = new Flight()
    flight.flightNum = req.body.flightNum;
    flight.airline = req.body.airline;
    flight.airDepart = req.body.airDepart;
    flight.dateDepart = req.body.dateDepart;
    flight.timeDepart = req.body.timeDepart;
    flight.airDest = req.body.airDest;
    flight.dateDest = req.body.dateDest;
    flight.timeDest = req.body.timeDest;
    flight.plane = req.body.plane;

    const currentAirline = await AppDataSource // Проверка авиакомпании на существование
        .getRepository(Airline)
        .createQueryBuilder("airline")
        .where("airline.id = :id", {id: +req.body.airline})
        .leftJoinAndSelect("airline.planes", "planes")
        .getOne()
    if (!currentAirline) {
        res.status(404).json({msg: "Указанная авиакомпания не найдена"})
        return
    }

    const currentPlane = await AppDataSource // Проверки на самолёт
        .getRepository(Plane)
        .createQueryBuilder("plane")
        .where("plane.id = :id", {id: +req.body.plane})
        .getOne()
    if (!currentPlane) { // Существует ли самолёт
        res.status(404).json({msg: "Указанный самолёт не найден"})
        return;
    }
    if (!currentAirline.planes.find(el => el.id === currentPlane.id)) { // Входит ли самолёт в авиакомпанию рейса
        res.status(400).json({msg: "Самолёт не входит в авиакомпанию рейса"})
        return;
    }
    flight.freePlaces = currentPlane.totalPlaces;
    res.json(await AppDataSource.getRepository(Flight).save(flight))
}
