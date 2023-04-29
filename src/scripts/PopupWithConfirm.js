import { Popup } from "./Popup.js"; 

export class PopupWithConfirm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit.bind(this);
        this._formSelector = ".popup__input";
    }

    setEventListeners(confirmElement) {
        this._form = this._element.querySelector(this._formSelector);
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this.card); // FIXME
          })
    }

    open(confirmElement) {
        //FIXME
        this.setEventListeners(confirmElement);
        this.card = confirmElement;
        super.open();
    }

    close() {
        this._form.reset();
        super.close();
    }

}