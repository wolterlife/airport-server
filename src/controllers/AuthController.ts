import {Request, Response} from "express";
import {AppDataSource} from "../../db";
import {User} from "../models/User";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.login = async function (req: Request, res: Response) {
    const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.login = :login", {login: req.body.login})
        .getOne()
    if (!user) return res.status(401).json({msg: `Пользователь ${req.body.login} не найден`})
    const isPassValid = bcrypt.compareSync(req.body.password, user.password);
    const token = jwt.sign({id: user.login}, "SECRET_KEY", {expiresIn: "24h"})
    if (isPassValid) res.json({
        user: {
            login: user.login,
            role: user.role,
        },
        token,
    })
    else return res.json({msg: "Неправильный пароль"})
        // https://youtu.be/o30BcvKwcvg
}

exports.registration = async function (req: Request, res: Response) {
    const checkUnique = await AppDataSource // Проверка на уникальность логина
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.login = :login", {login: req.body.login})
        .getOne()
    if (checkUnique) {return (res.status(400).json({msg: "Данный логин уже занят"}))}
    const user = new User();
    const hashPassword = bcrypt.hashSync(req.body.password, 7);
    user.login = req.body.login;
    user.password = hashPassword;
    user.role = req.body.role;
    await AppDataSource.getRepository(User).save(user);
    res.json({msg: "Пользователь успешно зарегестрирован"})
}
