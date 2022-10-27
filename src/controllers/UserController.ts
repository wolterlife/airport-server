import {Request, Response} from "express";
import {AppDataSource} from "../../db";
import {User} from "../models/User";

exports.getUsers = async function (req: Request, res: Response) {
    const users = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .getMany()
    res.json(users);
}

exports.getUserByLogin = async function (req: Request, res: Response) {
    const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.login = :login", {login: req.params.login})
        .getOne()
    if (user) res.json(user);
    else res.sendStatus(404);
}

exports.createUser = async function (req: Request, res: Response) {
    const checkUnique = await AppDataSource // Проверка на уникальность логина
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.login = :login", {login: req.body.login})
        .getOne()
    if (checkUnique) {
        res.status(400).json({msg: "Данный логин уже занят"})
        return;
    }
    const user = new User();
    user.login = req.body.login;
    user.password = req.body.password;
    user.role = req.body.role;
    const result = await AppDataSource.getRepository(User).save(user);
    res.send(result);
}

exports.updateUser = async function (req: Request, res: Response) {
    const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.login = :login", {login: req.params.login})
        .getOne()
    if (user) {
        AppDataSource.getRepository(User).merge(user, req.body)
        res.json(await AppDataSource.getRepository(User).save(user))
    } else res.status(404).json({msg: "Пользователь не найден"});
}

exports.deleteUser = async function (req: Request, res: Response) {
    const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.login = :login", {login: req.params.login})
        .getOne()
    if (user) {
        await AppDataSource.getRepository(User).delete(user)
        res.json(user)
    } else res.status(404).json({msg: "Пользователь не найден"});
}
