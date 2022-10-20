import {AppDataSource} from "../../db";

const {Flight} = require("../models/Flight");
import {Request, Response} from "express";

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

exports.updateFlight = async function (req: Request, res: Response) {
    const flight = await AppDataSource
        .getRepository(Flight)
        .createQueryBuilder("flight")
        .where("flight.id = :id", {id: +req.params.id})
        .getOne()
    if (flight) {
        AppDataSource.getRepository(Flight).merge(flight, req.body)
        res.json(await AppDataSource.getRepository(Flight).save(flight));
    } else res.sendStatus(404);
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
    flight.freePlaces = req.body.freePlaces;
    res.json(await AppDataSource.getRepository(Flight).save(flight))
}
