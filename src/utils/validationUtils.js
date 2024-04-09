export const validateName = (name) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/u;

  if (!name.trim()) {
    return 'Имя не должно быть пустым';
  } else if (name.length < 2) {
    return 'Мин. количество символов имени - 2';
  } else if (name.length > 50) {
    return 'Макс. количество символов имени - 50';
  } else if (!regex.test(name)) {
    return 'Разрешены только буквы, дефисы и пробелы';
  }
  return '';
};

export const validateEmail = (email) => {
  const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  if (!email.trim()) {
    return 'Почта не должна быть пустой';
  } else if (!regex.test(email)) {
    return 'Некорректный формат почты';
  } else if (email.length > 80) {
    return 'Макс. количество символов почты - 80';
  }
  return '';
};

export const validateLogin = (login) => {
  const regex = /^[a-zA-Z0-9_]+$/;

  if (!login.trim()) {
    return 'Логин не должен быть пустым';
  } else if (login.length < 5) {
    return 'Мин. количество символов логина - 5';
  } else if (login.length > 60) {
    return 'Макс. количество символов логина - 60';
  } else if (!regex.test(login)) {
    return 'Разрешены только латинские буквы, цифры и символ подчеркивания';
  }
  return '';
};

export const validatePassword = (password) => {
  const regex = /^[^\sа-яА-Я]*$/;

  if (!password.trim()) {
    return 'Пароль не должен быть пустым';
  } else if (password.length < 8) {
    return 'Мин. количество символов пароля - 8 символов';
  } else if (password.length > 60) {
    return 'Макс. количество символов пароля - 60 символов';
  } else if (!regex.test(password)) {
    return 'Пароль не может содержать кириллицу';
  }
  return '';
};

export const validateComment = (comment) => {
  if (!comment.trim() || comment.length < 50) {
    return 'Пожалуйста, опишите что-то в комментарии';
  } else if (comment.length > 1300) {
    return 'Макс. количество символов - 1300';
  } else {
    return '';
  }
};

export const validateSuggestionComment = (suggestionComment) => {
  if (!suggestionComment.trim() || suggestionComment.length < 50) {
    return 'Пожалуйста, опишите что-то в предложении';
  } else if (suggestionComment.length > 1300) {
    return 'Макс. количество символов - 1300';
  } else {
    return '';
  }
};

export const validateCategoryName = (name) => {
  if (!name || !name.trim()) {
    return 'Название не должно быть пустым';
  } else if (name.length > 100) {
    return 'Максимальная длина названия категории - 100 символов';
  }
  return '';
};

export const validateCategorySubtitle = (subtitle) => {
  if (subtitle && subtitle.length > 250) {
    return 'Макс. количество символов подзаголовка - 250 символов';
  }
  return '';
};