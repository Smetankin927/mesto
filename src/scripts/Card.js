export class Card {
    constructor(data, templateSelector, handleCardImage,likeHandler,dislikeHandler,deleteHandler/*,popupConfirm*/, myID) {
        this._text = data.name;
        this._link = data.link;
        this.id = data._id;
        this._owherId = data.owner._id;
        this._userId = myID;
        this._likesArr = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardImage = handleCardImage;
        //this.popupConfirm = popupConfirm;
        this.likeHandler = likeHandler;
        this.dislikeHandler = dislikeHandler;
        this.deleteHandler = deleteHandler;
        this.isLiked = false;
    }
    isMyLiked(){
        this._likesArr.forEach(item =>{
            if(item._id == this._userId){
                this.isLiked =true;
                this.likeButton.classList.toggle('cards-grid__like-button_active');
            }
        }
        )
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
        this.likeButton = this._element.querySelector('.cards-grid__like-button');
        this._deleteButton = this._element.querySelector('.cards-grid__trash-button');//поправить зависимость владельца
        if(this._userId !== this._owherId)
        {
            this._deleteButton.classList.add('cards-grid__trash-button_disabled');
        }
        //Listeners
        this._setEventListeners()
        //likes
        this.likesHTML = this._element.querySelector('.cards-grid__like-counter');
        this.likesHTML.textContent = this._likesArr.length;
        //
        this.isMyLiked();
        return this._element;
    }

    _setEventListeners(){
        
        //Like Button
        this.likeButton.addEventListener('click', () => {
            this._toggleLike();
        });
        //deletebutton
        this._deleteButton.addEventListener('click', () => {
            this.deleteHandler(this); 
        });
        // popup image
        this._image.addEventListener('click', () => {   /// ЗДЕСЬ КАРТИНКА НЕ ОПРЕДЕЛЕНА
            this._handleCardImage(this._text, this._link);
        });
    }
    
    deleteCard() {
        this._deleteButton.closest('.cards-grid__item').remove();
    }

    updateLikeCounter(){
        console.log("here");
        this.likesHTML.textContent = this._likesArr.length;
    }

    _toggleLike() {
        if(this.isLiked){ // если лайкнута вызываем дизлайк
            this.isLiked = false;
            this.dislikeHandler(this)          
        }
        else{
            this.isLiked = true;
            this.likeHandler(this);
        }
        //this._likeButton.classList.toggle('cards-grid__like-button_active');
      }

}


