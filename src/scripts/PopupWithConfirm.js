import { Popup } from "./Popup.js"; 

export class PopupWithConfirm extends Popup {
    constructor({popupSelector/*, handleFormSubmit*/}) {
        super(popupSelector);
        //this._handleFormSubmit = handleFormSubmit.bind(this);
        this._formSelector = ".popup__input";
    }

    setConfirmFunction(func){
        this._handleFormSubmit = func;
    }

    setEventListeners() {
        this._form = this._element.querySelector(this._formSelector);
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(); // FIXME
          })
    }

    close() {
        this._form.reset();
        super.close();
    }

}