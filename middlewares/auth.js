require('dotenv').config();

// console.log(process.env.NODE_ENV); // production
const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');
const { unauthorizedErrorText, unauthorizedPayloadErrorText } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErr(unauthorizedErrorText);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // payload = jwt.verify(token, 'some-secret-key');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedErr(unauthorizedPayloadErrorText);
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
