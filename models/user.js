const bcrypt = require('bcryptjs'); // импортируем bcrypt
const mongoose = require('mongoose');
// const { default: isURL } = require('validator/lib/isURL');
const { isEmail } = require('validator');

const validateEmail = (email) => isEmail(email);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя не может быть меньше 2 символов'],
    maxlength: [30, 'Имя не может быть больше 30 символов'],
    required: [true, 'Поле обязательно к заполнению'],
    // default: 'Жак-Ив Кусто',
  },

  email: {
    type: String,
    unique: [true, 'Пользователь с таким email уже существет'],
    required: [true, 'Поле обязательно к заполнению'],
    validate: {
      validator: validateEmail,
    },
    message: 'Поле должно содержать email',
  },

  password: {
    type: String,
    select: false,
    required: true,
  },

});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль12'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль13'));
          }
          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
