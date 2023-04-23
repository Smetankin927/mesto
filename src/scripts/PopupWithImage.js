import { Popup } from "./Popup.js"; 

export class PopupWithImage extends Popup {
    constructor(popupSelector,{src, alt}) {
        super(popupSelector);
        this._image = this._element.querySelector('.popup__huge-image');
        this._imageText  = this._element.querySelector('.popup__image-text');
        this._src = src;
        this._alt = alt;
    }

    open() {
        this._image.src = this._src;
        this._image.alt = this._alt;
        this._imageText.textContent = this._alt;
        super.open()
    }
}