export class Card {
    constructor(data, templateSelector, handleCardImage) {
        this._text = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardImage = handleCardImage;
    }

    _getTemplate() {
        const templateElement = document.getElementById(this._templateSelector).content.cloneNode(true);
        return templateElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        //img
        this._image = this._element.querySelector('.cards-grid__image')
        this._image.src = this._link;
        this._image.alt = this._text;
        //text
        this._element.querySelector('.cards-grid__text').textContent = this._text;
        // buttons
        this._likeButton = this._element.querySelector('.cards-grid__like-button');
        this._deleteButton = this._element.querySelector('.cards-grid__trash-button');
        //Listeners
        this._setEventListeners()

        return this._element;
    }

    _setEventListeners(){
        
        //Like Button
        this._likeButton.addEventListener('click', () => {
            this._toggleLike();
        });
        //deletebutton
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });
        // popup
        this._image.addEventListener('click', () => {   /// ЗДЕСЬ КАРТИНКА НЕ ОПРЕДЕЛЕНА
            this._handleCardImage(this._text, this._link);
        });

    }
    
    _deleteCard() {
        this._deleteButton.closest('.cards-grid__item').remove();
    }

    _toggleLike() {
        this._likeButton.classList.toggle('cards-grid__like-button_active');
      }

}


