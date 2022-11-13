const BadRequestErr = require('../errors/bad-request-err');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundErr = require('../errors/not-found-err');
const Movie = require('../models/movie');
const {
  badRequestErrorText, forbiddenErrorText, movieIdNotFoundErrorText, messageDeleteMovie,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
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
        next(new BadRequestErr(badRequestErrorText));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params.id)
    .orFail(new NotFoundErr(movieIdNotFoundErrorText))
    .then((movie) => {
      const movieOwner = movie.owner.toString();
      if (movieOwner !== owner) {
        throw new ForbiddenErr(forbiddenErrorText);
      }
      return movie.delete()
        .then(() => {
          res.send({ message: messageDeleteMovie });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(badRequestErrorText));
      } else {
        next(err);
      }
    });
};
