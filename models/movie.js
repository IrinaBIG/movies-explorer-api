const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');
const { fieldIsRequiredErrorText, badRequestErrorText } = require('../utils/constants');

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: [true, fieldIsRequiredErrorText],
    validate: {
      validator: isURL,
    },
    message: badRequestErrorText,
  },

  trailerLink: {
    type: String,
    required: [true, fieldIsRequiredErrorText],
    validate: {
      validator: isURL,
    },
    message: badRequestErrorText,
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
    },
    message: badRequestErrorText,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
