import {Airline} from "../models/Airline";
import {Request, Response} from "express";
import {AppDataSource} from "../../db";

exports.getAirlines = async function (req: Request, res: Response) {
    const allAirlines = await AppDataSource.getRepository(Airline).find();
    res.json(allAirlines);
}

exports.getAirlineById = async function (req: Request, res: Response) {
    const airline = await AppDataSource.getRepository(Airline).findOneBy({
        id: +req.params.id,
    })
    if (!airline) res.sendStatus(404);
    else res.json(airline);
}

exports.createAirline = async function (req: Request, res: Response) {
    const airline = new Airline();
    airline.nameOfAirline = req.body.nameOfAirline;
    airline.office = req.body.office;
    await AppDataSource.getRepository(Airline).save(airline)
    res.json({
        nameOfAirline: req.body.nameOfAirline,
        office: req.body.office,
    })
}

exports.updateAirline = async function (req: Request, res: Response) {
    const airline = await AppDataSource.getRepository(Airline).findOneBy({
        id: +req.params.id,
    });
    if (airline) {
        AppDataSource.getRepository(Airline).merge(airline, req.body);
        res.json(await AppDataSource.manager.save(airline));
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

