const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const {
  badRequestErrorText, conflictErrorText, fieldIsRequiredErrorText,
  fieldNameLengtsErrorText, loginErrText,
} = require('../utils/constants');
const UnauthorizedErr = require('../errors/unauthorized-err');

const validateEmail = (email) => isEmail(email);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, fieldNameLengtsErrorText],
    maxlength: [30, fieldNameLengtsErrorText],
    required: [true, fieldIsRequiredErrorText],
  },

  email: {
    type: String,
    unique: [true, conflictErrorText],
    required: [true, fieldIsRequiredErrorText],
    validate: {
      validator: validateEmail,
    },
    message: badRequestErrorText,
  },

  password: {
    type: String,
    select: false,
    required: true,
  },

});

userSchema.statics.findUserByCredentials = function findUserByEmailPassword(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedErr(loginErrText));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedErr(loginErrText));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
