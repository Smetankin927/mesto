export class FormValidator {
    constructor(options, formHTML){
    
       this._form = formHTML;
       this._submitSelector = options.submitSelector;
       this._inputSelector = options.inputSelector;
       this._inputSectionSelector = options.inputSectionSelector;
       this._inputErrorSelector = options.inputErrorSelector;
       this._inputErrorClass = options.inputErrorClass;
       this._disabledButtonClass = options.disabledButtonClass;
    }
    ////////////////////////

    _hiddenError(errorElement) {
        errorElement.innerText = '';
        errorElement.classList.remove(this._inputErrorClass);
    };
    
    _showError(errorElement, message) {
        errorElement.innerText = message;
        errorElement.classList.add(this._inputErrorClass);
    };
    
    /**/
    _setInputState(inputElement, isValid) {
        const inputSectionElement = inputElement.closest(this._inputSectionSelector);
        const errorElement = inputSectionElement.querySelector(this._inputErrorSelector);
        if (isValid) {
            this._hiddenError(errorElement);
        } else {
            this._showError(errorElement, inputElement.validationMessage);
        }
    };
    
    /**/
    _toggleInputState(inputElement) {
        const isValid = inputElement.validity.valid;
        this._setInputState(inputElement, isValid);
    };
    
    _enableButton() {
        this._submitElement.removeAttribute('disabled');
        this._submitElement.classList.remove(this._disabledButtonClass);
    };
    
    _disableButton() {
        this._submitElement.setAttribute('disabled', true);
        this._submitElement.classList.add(this._disabledButtonClass);
    };
    
    _toggleButtonState() {
        const formIsValid = this._inputs.every(inputElement => inputElement.validity.valid);
    
        if (formIsValid) {
            this._enableButton();
        } else {
            this._disableButton();
        }
    };
    
    _setEventListeners() {
        this._submitElement = this._form.querySelector(this._submitSelector);
        this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    
        this._inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();
    };
    
    resetInputs() {
        this._inputs.forEach((inputElement) => {//<==очищаем ошибки ==
            inputElement.value = '';
        });
    }

    _resetErrorsFromInput(inputElement) {
        const inputSectionElement = inputElement.closest(this._inputSectionSelector);
        const errorElement = inputSectionElement.querySelector(this._inputErrorSelector);
        this._hiddenError(errorElement) //<==очищаем ошибки ==
    }

    resetValidation() {
        this._toggleButtonState(); //<== управляем кнопкой ==
  
        this._inputs.forEach((inputElement) => {//<==очищаем ошибки ==
            this._resetErrorsFromInput(inputElement)
        });
  
      }
  
    ///////////////

    enableValidation() {
        this._setEventListeners();
    };
}
