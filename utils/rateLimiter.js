const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // за 20 минут
  max: 1000, // можно совершить максимум 100 запросов с одного IP
});

// rateLimit(limiter);

module.exports = limiter;
