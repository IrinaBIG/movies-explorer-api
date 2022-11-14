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

const app = express();
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DB_URL : devDataBaseURL);

app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handlerErrors);

app.listen(PORT);
