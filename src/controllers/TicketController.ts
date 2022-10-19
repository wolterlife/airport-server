import {Request, Response} from "express";
import {AppDataSource} from "../../db";
import {Ticket} from "../models/Ticket";

//TODO: Подтягивание рейсов и логинов во всех гет контроллера.
// Сделать связи и контроллер на флайт
exports.getAllTickets = async function (req: Request, res: Response) {
    const tickets = await AppDataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .getMany()
    res.json(tickets);
}

exports.getBy = async function (req: Request, res: Response) {
    let ticket;
    switch (req.query.method) {
        case "by-user": // Поиск по пассажиру
            ticket = await AppDataSource
                .getRepository(Ticket)
                .createQueryBuilder("ticket")
                .where("ticket.login = :login", {login: req.params.id})
                .getMany()
            break;
        case "by-flight": // Поиск по рейсу
            ticket = await AppDataSource
                .getRepository(Ticket)
                .createQueryBuilder("ticket")
                .where("ticket.flight = :flight", {flight: +req.params.id})
                .getMany()
            break;
        default: {
            res.status(400).json({msg: "Ошибка query параметров"})
            return
        }
    }
    if (ticket) res.json(ticket)
    else res.sendStatus(404);
}

exports.createTicket = async function (req: Request, res: Response) {
    const ticket = new Ticket();
    ticket.FIO_pass = req.body.FIO_pass;
    ticket.flight = req.body.flight;
    ticket.login = req.body.login;
    ticket.status = req.body.status;
    ticket.numPass = req.body.numPass;
    ticket.numPlace = req.body.numPlace
    res.json(await AppDataSource.getRepository(Ticket).save(ticket))
}

exports.updateByLogin = async function (req: Request, res: Response) {

}

exports.updateByFlight = async function (req: Request, res: Response) {

}

exports.deleteByLogin = async function (req: Request, res: Response) {

}

exports.deleteByFlight = async function (req: Request, res: Response) {

}
