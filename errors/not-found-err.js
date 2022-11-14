const { NOT_FOUND } = require('../utils/constants');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'notFoundError';
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundErr;
