const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');
const notFoundRoutes = require('./notFound');
const { login, createUser } = require('../controllers/users');
const { celebrateSignUp, celebrateSignIn } = require('../middlewares/validation');

router.post('/signup', celebrateSignUp, createUser);
router.post('/signin', celebrateSignIn, login);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('*', notFoundRoutes);

module.exports = router;
