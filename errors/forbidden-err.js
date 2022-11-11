const { FORBIDDEN } = require('../utils/constants');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'forbiddenError';
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenErr;
