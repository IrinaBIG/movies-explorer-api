const { UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'unauthorizedErr';
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedErr;
