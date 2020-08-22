export const validate = (login, password, passwordRepeat) => {
  if (login.length < 4 || login.length > 20) {
    return [false, "В логине должен быть от 4 до 20 символов"];
  }
  if (/^[a-zA-Z1-9а-яА-ЯёЁ_.+-@]+$/.test(login) === false) {
    return [
      false,
      "В логине должны быть только буквы, цифры и символы @/./+/-/_"
    ];
  }
  if (password.length < 4 || password.length > 20) {
    return [false, "В пароле должен быть от 4 до 20 символов"];
  }
  if (password !== passwordRepeat) {
    return [false, "Пароль не совпадает"];
  }
  let formData = new FormData();
  formData.set("username", login);
  formData.set("password", password);
  return [true, formData];
};
