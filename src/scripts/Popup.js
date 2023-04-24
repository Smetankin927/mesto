export class Popup {
    constructor(popupSelector) {
        this._selector = popupSelector;
        this._element = document.querySelector(this._selector);
        this._buttonClose =  this._element.querySelector('.popup__button-close');
        this._handleEscClose = this._handleEscClose.bind(this)// <==== привязали 1 раз ===
    }
    open() {
        this._element.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
        }
      
    close() {
        this._element.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(evt){ 
            if (evt.key === 'Escape') {
               this.close();
            }
        }

    _handleOverlayClick(evt) {
        if(evt.target === evt.currentTarget){
            this.close();
          }
    }
    setEventListeners() {
        this._buttonClose.addEventListener('click', () => {this.close()});
        //document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
        this._element.addEventListener('click', (evt) => {this._handleOverlayClick(evt);});
    } 
    
    /*generate() {
        this._element = this._getElement();
        this._setEventListeners();
    
          return this._element;
      }*/
}
