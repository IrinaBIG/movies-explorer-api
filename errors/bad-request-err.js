const { ERROR_CODE } = require('../utils/constants');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'badRequestError';
    this.statusCode = ERROR_CODE;
  }
}

module.exports = BadRequestErr;
