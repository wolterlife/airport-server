const jwt = require('jsonwebtoken')
const {secretKey} = require('../../config')


module.exports = function (listRoles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({message: "Пользователь не авторизован"})
      }
      const {roles} = jwt.verify(token, secretKey)
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
