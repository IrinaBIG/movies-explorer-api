const BadRequestErr = require('../errors/bad-request-err');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundErr = require('../errors/not-found-err');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next());
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params.id)
    .orFail(new NotFoundErr(`Карточка с ID '${req.params.id}' не найдена`))
    .then((movie) => {
      const movieOwner = movie.owner.toString();
      if (movieOwner !== owner) {
        throw new ForbiddenErr('Вы не можете удалить карточку другого пользователя.');
      }
      return movie.delete()
        .then(() => {
          res.send({ message: `Карточка с ID '${req.params.id}' удалена` });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};
