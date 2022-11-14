const router = require('express').Router();

const {
  getMovies, deleteMovie, createMovie,
} = require('../controllers/movies');

const { celebrateCreateMovie, celebrateDeleteMovie } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', celebrateCreateMovie, createMovie);
router.delete('/:id', celebrateDeleteMovie, deleteMovie);

module.exports = router;
