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
