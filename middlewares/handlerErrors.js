const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message = 'На сервере произошла ошибка' } = err;
  res.status(statusCode).json({ message: statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message });
  next();
};
