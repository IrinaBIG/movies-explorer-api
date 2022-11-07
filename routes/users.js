const router = require('express').Router();

const {
  getUserMe, updateUser,
} = require('../controllers/users');

const { celebrateUpdateUser } = require('../middlewares/validation');

router.get('/me', getUserMe);
router.patch('/me', celebrateUpdateUser, updateUser);

module.exports = router;
