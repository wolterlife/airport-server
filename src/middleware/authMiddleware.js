const jwt = require('jsonwebtoken')
const {secretKey} = require('../../config')
const {AppDataSource} = require("../../db");
const {User} = require("../models/User");


module.exports = function (listRoles) {
  return async function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({message: "Пользователь не авторизован"})
      }

      // Получение ролей текущего пользователя по токену
      const {login} = jwt.verify(token, secretKey)
      let currentUser = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.login = :login", {login: login})
        .getOne();
      let roles = currentUser.roles;

      // Проверка, содержит ли список ролей пользователя разрешённую роль
      let hasRole = false
      roles.split(' ').forEach(role => {
        if (listRoles.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({message: "У вас нет доступа"})
      }
      next();
    } catch (e) {
      console.log(e)
      return res.status(403).json({message: "Пользователь не авторизован"})
    }
  }
};
