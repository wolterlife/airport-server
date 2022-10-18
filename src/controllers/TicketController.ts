import {Request, Response} from "express";
import {AppDataSource} from "../../db";
import {Ticket} from "../models/Ticket";

exports.getAllTickets = async function (req: Request, res: Response) {
    const tickets = await AppDataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .getMany()
    res.json(tickets);
}

exports.getBy = async function (req: Request, res: Response) {
    const ticket = await AppDataSource.getRepository(Ticket)
    console.log(req.query);
    switch (req.query.method) {
        case "by-user": // Поиск по пассажиру
            await ticket
                .createQueryBuilder("ticket")
                .where("ticket.login = :login", {login: req.params.id})
                .getOne()
            break;
        case "by-flight": // Поиск по рейсу
            await ticket
                .createQueryBuilder("ticket")
                .where("ticket.flight = :flight", {flight: req.params.id})
                .getOne()
            break;
        default: {
            res.status(400).json({msg: "Ошибка query параметров"})
        }
    }
    if (ticket) res.json(ticket)
    else res.sendStatus(404);
}

exports.createTicket = async function (req: Request, res: Response) {

}

exports.updateByLogin = async function (req: Request, res: Response) {

}

exports.updateByFlight = async function (req: Request, res: Response) {

}

exports.deleteByLogin = async function (req: Request, res: Response) {

}

exports.deleteByFlight = async function (req: Request, res: Response) {

}
