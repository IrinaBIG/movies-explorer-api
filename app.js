require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors);

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());
app.use(limiter);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(handlerErrors); // централизованнный обработчик

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
