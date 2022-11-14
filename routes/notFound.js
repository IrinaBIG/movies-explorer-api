const router = require('express').Router();
const NotFoundErr = require('../errors/not-found-err');
const { routeNotFounderErrorText } = require('../utils/constants');

router.use('*', () => {
  throw new NotFoundErr(routeNotFounderErrorText);
});

module.exports = router;
