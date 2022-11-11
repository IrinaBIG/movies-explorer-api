const ERROR_CODE = 400; //  когда с запросом что-то не так;
const UNAUTHORIZED = 401; //  когда что-то не так при аутентификации или авторизации;
const FORBIDDEN = 403;
const NOT_FOUND = 404; //  например, когда мы не нашли ресурс по переданному _id;
const INTERNAL_SERVER_ERROR = 500;
const CONFLICT_ERROR = 409;
const userIdNotFoundErrorText = 'Пользователь с указанным _id не найден.';
const badRequestErrorText = 'Переданы некорректные данные';
const conflictErrorText = 'Пользователь с таким email уже существует';
const unauthorizedErrorText = 'Необходима авторизация';
const unauthorizedPayloadErrorText = 'Необходима авторизация (payload)';
const forbiddenErrorText = 'Вы не можете удалить фильм другого пользователя.';
const movieIdNotFoundErrorText = 'Фильм с указанным ID не найден';
const messageDeleteMovie = 'Фильм удален';

module.exports = {
  ERROR_CODE,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  UNAUTHORIZED,
  CONFLICT_ERROR,
  userIdNotFoundErrorText,
  badRequestErrorText,
  conflictErrorText,
  unauthorizedErrorText,
  unauthorizedPayloadErrorText,
  forbiddenErrorText,
  movieIdNotFoundErrorText,
  messageDeleteMovie,
};
