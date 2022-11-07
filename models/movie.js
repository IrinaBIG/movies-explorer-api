const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

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
    minlength: [4, 'Год не может быть меньше 4 символов'],
    maxlength: [4, 'Год не может быть больше 4 символов'],
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: [true, 'Поле обязательно к заполнению'],
    validate: {
      validator: isURL,
    },
    message: 'Поле должно содержать URL',
  },

  trailerLink: {
    type: String,
    required: [true, 'Поле обязательно к заполнению'],
    validate: {
      validator: isURL,
    },
    message: 'Поле должно содержать URL',
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
    },
    message: 'Поле должно содержать URL',
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);
