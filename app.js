require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter, devDataBaseURL } = require('./utils/config');
const router = require('./routes');
const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const cors = require('./middlewares/cors');

const { NODE_ENV, DB_URL, PORT = 3000 } = process.env;
// const { DB_URL = 'mongodb://localhost:27017/moviesdb', PORT = 3000 } = process.env;
const app = express();
app.use(cors);

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect(NODE_ENV === 'production' ? DB_URL : devDataBaseURL);

app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());
app.use(limiter);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(handlerErrors); // централизованнный обработчик

app.listen(PORT);
