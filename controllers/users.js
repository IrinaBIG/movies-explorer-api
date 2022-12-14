require('dotenv').config();
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const BadRequestErr = require('../errors/bad-request-err');
const NotFoundErr = require('../errors/not-found-err');
const ConflictErr = require('../errors/conflict-err');
// const UnauthorizedErr = require('../errors/unauthorized-err');
const User = require('../models/user');
const { userIdNotFoundErrorText, badRequestErrorText, conflictErrorText } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(userIdNotFoundErrorText);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(badRequestErrorText));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(userIdNotFoundErrorText);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictErr(conflictErrorText));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestErr(badRequestErrorText));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  // хешируем пароль
  bcrypt.hash(req.body.password, 7)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictErr(conflictErrorText));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestErr(badRequestErrorText));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }) });
    })
    .catch(next);
};
