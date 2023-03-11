
const togglePassword = (passwordInput, togglePasswordButton) => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordButton.textContent = "Спрятать пароль";
    togglePasswordButton.setAttribute("aria-label", "Спрятать пароль.");
  } else {
    passwordInput.type = "password";
    togglePasswordButton.textContent = "Показать пароль";
    togglePasswordButton.setAttribute(
      "aria-label",
      "Показать пароль как простой текст. Предупреждение: это отобразит пароль на экране."
    );
  }
};

const enablePasswordToggle = () => {
  const togglePasswordButtonsList = Array.from(
    document.querySelectorAll(".form__toggle-password")
  );

  togglePasswordButtonsList.forEach((togglePasswordButton) => {
    const togglePasswordHandler = (event) => {
      const formSection = event.target.closest(".form__section");
      const passwordInput = formSection.querySelector(
        ".form__input_type_password"
      );

      togglePassword(passwordInput, togglePasswordButton);
    };

    togglePasswordButton.addEventListener("click", togglePasswordHandler);
  });
};

enablePasswordToggle();


// Код отсюда

const validationOptions = {
  formSelector: '.form',
  submitSelector: '.form__submit',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__section',
  inputErrorSelector: '.form__input-error',
  inputErrorClass: 'form__input-error_active',
  disabledButtonClass: 'form__submit_inactive',
};

enableValidation(validationOptions);

const formSignIn = document.forms.signIn;
const resetButton = formSignIn.querySelector('.form__reset');
const submitButton = formSignIn.querySelector('.form__submit');

formSignIn.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(formSignIn);
  formSignIn.reset();
  disableButton(submitButton, validationOptions.disabledButtonClass);
});

resetButton.addEventListener('click', () => {
  const inputs = Array.from(formSignIn.querySelectorAll('.form__input'));
  /**
   * Комментарий №3 (Последний)
   * Вместо функции hiddenErrorForInput теперь вызывается setInputState
   * с нужным состоянием для инпута (валидное или невалидное)
   */
  inputs.forEach(input => {
    setInputState(input, true, validationOptions);
  });
  disableButton(submitButton, validationOptions.disabledButtonClass);
});
