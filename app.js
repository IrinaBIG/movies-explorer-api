const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { celebrateSignUp, celebrateSignIn } = require('./middlewares/validation');
const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors);

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());

app.post('/signup', celebrateSignUp, createUser);
app.post('/signin', celebrateSignIn, login);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));
app.use('*', require('./routes/notFound'));

app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(handlerErrors); // централизованнный обработчик

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
