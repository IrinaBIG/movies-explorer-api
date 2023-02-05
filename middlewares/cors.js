// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://api.diplomabig.students.nomoredomains.icu',
  'https://irinabigdiploma.nomoredomainsclub.ru/',
  'http://api.diplomabig.students.nomoredomains.icu',
  'http://irinabigdiploma.nomoredomainsclub.ru/',
  'http://localhost:7777',
  'http://localhost:3000',
  'http://127.0.0.1',
];

module.exports = (req, res, next) => {
  // console.dir(req);
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }
  return next();
};
