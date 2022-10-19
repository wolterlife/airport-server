import {AppDataSource} from "../../db";

const {Flight} = require("../models/Flight");
import {Request, Response} from "express";

exports.getFlights = async function (req: Request, res: Response) {

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
