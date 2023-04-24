import { Popup } from "./Popup.js"; 

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._element.querySelector('.popup__huge-image');
        this._imageText = this._element.querySelector('.popup__image-text');
    }

    open({src, alt}) {
        this._image.src = src;
        this._image.alt = alt;
        this._imageText.textContent = alt;
        super.open()
    }
}