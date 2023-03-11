const hiddenError = (errorElement, inputErrorClass) => {
	errorElement.innerText = '';
	errorElement.classList.remove(inputErrorClass);
};

const showError = (errorElement, message, inputErrorClass) => {
	errorElement.innerText = message;
	errorElement.classList.add(inputErrorClass);
};

/**
 * Комментарий №1
 * Обновил тут код, теперь функция setInputState (новая) принимает 3 параметра
 * inputElement, isValid, options
 * isValid - это состояние input (валидное там значение или нет)
 */
const setInputState = (inputElement, isValid, options) => {
	const { inputSectionSelector, inputErrorSelector, inputErrorClass } = options;
	const inputSectionElement = inputElement.closest(inputSectionSelector);
	const errorElement = inputSectionElement.querySelector(inputErrorSelector);
	if (isValid) {
		hiddenError(errorElement, inputErrorClass);
	} else {
		showError(errorElement, inputElement.validationMessage, inputErrorClass);
	}
};

/**
 * Комментарий №2
 * Обновил тут код, теперь функция toggleInputState просто
 * вызывает setInputState со значение того, ввалидный инпут или нет
 * Удалил функции hiddenErrorForInput и findInputErrorElement
 */
const toggleInputState = (inputElement, options) => {
	const isValid = inputElement.validity.valid;
	setInputState(inputElement, isValid, options);
};

const enableButton = (buttonElement, disabledButtonClass) => {
	buttonElement.removeAttribute('disabled');
	buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
	buttonElement.setAttribute('disabled', true);
	buttonElement.classList.add(disabledButtonClass);
};

const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
	const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

	if (formIsValid) {
		enableButton(submitElement, disabledButtonClass);
	} else {
		disableButton(submitElement, disabledButtonClass);
	}
};

const setEventListeners = (form, options) => {
	const submitElement = form.querySelector(options.submitSelector);
	const inputs = Array.from(form.querySelectorAll(options.inputSelector));

	inputs.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			toggleInputState(inputElement, options);
			toggleButtonState(inputs, submitElement, options.disabledButtonClass);
		});
	});
	toggleButtonState(inputs, submitElement, options.disabledButtonClass);
};

const enableValidation = ({
	formSelector,
	submitSelector,
	inputSelector,
	inputSectionSelector,
	inputErrorSelector,
	inputErrorClass,
	disabledButtonClass,
}) => {
	const forms = Array.from(document.querySelectorAll(formSelector));
	forms.forEach(form => {
		setEventListeners(form, {
			submitSelector,
			inputSelector,
			inputSectionSelector,
			inputErrorSelector,
			inputErrorClass,
			disabledButtonClass,
		});
	});
};
