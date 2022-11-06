const jwt = require('jsonwebtoken')
const {secretKey} = require('../../config')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({msg: "Пользователь не авторизован"})
    }
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({msg: "Пользователь не авторизован"})
  }
}
