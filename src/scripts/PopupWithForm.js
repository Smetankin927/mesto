import { Popup } from "./Popup.js"; 

export class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formSelector = ".popup__input";
    }


    _getInputValues() {
        this._inputList = this._element.querySelectorAll(".popup__input-text");
        
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
        }



    setEventListeners() {
        this._form = this._element.querySelector(this._formSelector);
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
          })
    }

    setInitUserInfo(data) {
        this._form.querySelector('input[name = "first"]').value = data.name.trim();
        this._form.querySelector('input[name = "second"]').value = data.info.trim();
    }

    close() {
        this._form.reset();
        super.close();
    }

}