const { INTERNAL_SERVER_ERROR, internalServerErrorText } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message = (internalServerErrorText) } = err;
  res.status(statusCode).json({
    message: statusCode === INTERNAL_SERVER_ERROR
      ? internalServerErrorText
      : message,
  });
  next();
};
