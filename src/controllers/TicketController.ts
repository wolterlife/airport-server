import {Request, Response} from "express";
import {AppDataSource} from "../../db";
import {Ticket} from "../models/Ticket";

exports.getAllTickets = async function (req: Request, res: Response) {
    const tickets = await AppDataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .leftJoinAndSelect("ticket.login", "login")
        .leftJoinAndSelect("ticket.flight", "flight")
        .getMany()
    tickets.forEach(el => delete el.login.password) // Удаление поля пароль
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
                .leftJoinAndSelect("ticket.login", "login")
                .leftJoinAndSelect("ticket.flight", "flight")
                .getMany()
            break;
        case "by-flight": // Поиск по рейсу
            ticket = await AppDataSource
                .getRepository(Ticket)
                .createQueryBuilder("ticket")
                .where("ticket.flight = :flight", {flight: +req.params.id})
                .leftJoinAndSelect("ticket.login", "login")
                .leftJoinAndSelect("ticket.flight", "flight")
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

/*
exports.getByLogin = async function (req: Request, res: Response) {
    const ticket = await AppDataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .where("ticket.login = :login", {login: req.params.id})
        .leftJoinAndSelect("ticket.login", "login")
        .leftJoinAndSelect("ticket.flight", "flight")
        .getMany()
    if (ticket) {
        res.json(ticket);
    } else res.sendStatus(404);
}

exports.getByFlight = async function (req: Request, res: Response) {
    const ticket = await AppDataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .where("ticket.flight = :flight", {flight: +req.params.id})
        .leftJoinAndSelect("ticket.login", "login")
        .leftJoinAndSelect("ticket.flight", "flight")
        .getMany()
    if (ticket) {
        res.json(ticket);
    } else res.sendStatus(404);
}
* */

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

exports.updateTicket = async function (req: Request, res: Response) {
    const ticket = await AppDataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", {id: +req.params.id})
        .getOne()
    if (ticket) {
        AppDataSource.getRepository(Ticket).merge(ticket, req.body)
        res.json(await AppDataSource.getRepository(Ticket).save(ticket))
    } else res.sendStatus(404);
}

exports.deleteTicket = async function (req: Request, res: Response) {
    const ticket = await AppDataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", {id: +req.params.id})
        .getOne()
    if (ticket) {
        await AppDataSource.getRepository("ticket").delete(ticket);
        res.json(ticket)
    } else res.sendStatus(404);
}

