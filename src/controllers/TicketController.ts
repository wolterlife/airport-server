import {Request, Response} from "express";
import {AppDataSource} from "../../db";
import {Ticket} from "../models/Ticket";
import {Flight} from "../models/Flight";

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
    const flightRepos = AppDataSource.getRepository(Flight)
    const ticketRepos = AppDataSource.getRepository(Ticket)
    const ticket = new Ticket();
    ticket.FIO_pass = req.body.FIO_pass;
    ticket.flight = req.body.flight;
    ticket.login = req.body.login;
    ticket.status = req.body.status;
    ticket.numPass = req.body.numPass;
    ticket.numPlace = req.body.numPlace
    let currentFlight = await flightRepos
        .createQueryBuilder("flight")
        .where("flight.id = :id", {id: +req.body.flight})
        .getOne();
    if (currentFlight?.freePlaces === 0) { // Есть ли свободные места
        res.json({msg: "Ошибка. Билеты на текущий рейс распроданы"})
        return;
    }
    if (currentFlight) {
        flightRepos.merge(currentFlight, {freePlaces: currentFlight.freePlaces - 1}) // Уменьшение кол-во свободных билетов на 1
        await flightRepos.save(currentFlight)
        res.json(await ticketRepos.save(ticket))
    } else res.status(404).json({msg: "Рейс не найден"})
}

exports.updateTicket = async function (req: Request, res: Response) {
    const flightRepos = AppDataSource.getRepository(Flight)
    const ticketRepos = AppDataSource.getRepository(Ticket)
    const ticket = await ticketRepos
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", {id: +req.params.id})
        .getOne()
    if (!ticket) {
        res.sendStatus(404).json({msg: "Билет не найден"});
        return;
    }
    ticketRepos.merge(ticket, req.body)
    res.json(await ticketRepos.save(ticket))
}

exports.deleteTicket = async function (req: Request, res: Response) { // todo: check
    const ticket = await AppDataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", {id: +req.params.id})
        .getOne()
    if (!ticket) {
        res.sendStatus(404).json({msg: "Билет не найден"})
        return;
    }
    let currentFlight = await AppDataSource
        .getRepository(Flight)
        .createQueryBuilder("flight")
        .where("flight.id = :id", {id: ticket.flight})
        .getOne();
    if (currentFlight) {
        AppDataSource.getRepository(Flight).merge(currentFlight, {freePlaces: currentFlight.freePlaces + 1})
        await AppDataSource.getRepository(Ticket).delete(ticket);
        res.json(ticket)
    } else res.status(404).json({msg: "Рейс не найден"})
}

