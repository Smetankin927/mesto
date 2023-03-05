const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//профиль edit
let profile = document.querySelector('.profile');
let edit = profile.querySelector('.profile__edit-button');
let nameProfile = profile.querySelector('.profile__name');
let profProfile = profile.querySelector('.profile__name-subline');
//кнопка add
let add = profile.querySelector('.profile__add-button');
let popupCardText //FIXME
let popupCardLinks
// работаем с попапом
let popup;
let popupContainer;
let popupClose;
let popupForm;
let popupInFirst;
let popupInSecond;
let popupImage;
let popupImageText;
//карточки
const addButton = document.querySelector('.profile__add-button');
const itemGridWrapper = document.querySelector('.cards-grid');
const template = document.getElementById('template-card');
// функции
function chosePopup(tarName){
  if(tarName  === 'profile__edit-button'){
      popup = document.querySelector('.popup.popup_profile');
  }
  else if(tarName  === 'profile__add-button'){
      popup = document.querySelector('.popup.popup_place');
  }
  else if(tarName  === 'cards-grid__image'){
    popup = document.querySelector('.popup.popup_image');
  }

  if(tarName  === 'cards-grid__image'){
    popupContainer = popup.querySelector('.popup__container_image');
    popupImage = popupContainer.querySelector('.popup__huge-image');
    popupImageText = popupContainer.querySelector('.popup__image-text');
  }
  else{
    popupContainer = popup.querySelector('.popup__container');
    popupForm = popupContainer.querySelector('.popup__input');
    popupInFirst = popupContainer.querySelector('input[name = "first"]');
    popupInSecond = popupContainer.querySelector('input[name = "second"]');
  }

  popupClose = popupContainer.querySelector('.popup__button-close');
  popupClose.addEventListener('click', hidePopup);
  
  // навешиваем слушатели
  if(tarName  === 'profile__edit-button'){
      popupForm.addEventListener('submit', updateProfile); 
  }
  else if(tarName  === 'profile__add-button'){
      popupForm.addEventListener('click', addCard); 
  }

}

function showPopup(evt) {
    let tarName =  evt.target.className;
    chosePopup(tarName);
    popup.classList.add('popup_active');
    
    if(tarName === 'profile__edit-button'){
        popupInFirst.value = nameProfile.textContent.trim();
        popupInSecond.value = profProfile.textContent.trim();
    }
    else if(tarName === 'profile__add-button'){
      popupInFirst.value = '';
      popupInSecond.value = '';
    }
    else if (tarName  === 'cards-grid__image'){
      //заряжаем попап картинки
      let cardTmptext = evt.target.nextElementSibling.querySelector('.cards-grid__text');//костыль?
      console.log(evt.target.src.trim())
      popupImage.src = evt.target.src.trim();
      popupImageText.textContent = cardTmptext.textContent.trim();
    }
}

function hidePopup(){
    if(popup){
    popup.classList.remove('popup_active');
    }
}
//профиль функции
function updateProfile (evt) {
    evt.preventDefault();
    //
    nameProfile.textContent = popupInFirst.value.trim();
    profProfile.textContent = popupInSecond.value.trim();
    hidePopup(); 
}
//лайкаем 
function likeCard (evt) {
  evt.target.classList.toggle('cards-grid__like-button_active');
}
//удаляем
function deleteCard (evt) {
  evt.target.closest('.cards-grid__item').remove();
  //удалить из списка!!!!
}

//карточки функции
const getItemElement = (cardObj) => {
    //крафтим карточки
    const newCardItem = template.content.cloneNode(true);
    const newCardImage = newCardItem.querySelector('.cards-grid__image');
    const newCardText = newCardItem.querySelector('.cards-grid__text');
    newCardImage.src = cardObj.link;
    newCardText.textContent = cardObj.name;
    // внешка карточек закончена
    //кнопка лайка
    const likeButton = newCardItem.querySelector('.cards-grid__like-button');
    likeButton.addEventListener('click', likeCard);
    //кнопка удаления
    const deleteButton = newCardItem.querySelector('.cards-grid__trash-button');
    deleteButton.addEventListener('click', deleteCard);
    //
    newCardImage.addEventListener('click', showPopup);
    return newCardItem;
}
//отрисовываем карточки
const renderItem = (wrap, cardObj) => {
    wrap.prepend(getItemElement(cardObj))//хочу с конца массива потому что вызываю от реверс
}

//добавляем карточки
function addCard(evt){
  evt.preventDefault();
  //
  popupCardText = popupInFirst.value.trim();
  popupCardLinks = popupInSecond.value.trim();
  if(popupCardText && popupCardLinks){
    let newCardTmp = {name:popupCardText, link:popupCardLinks};//создаем новую временную карточку
    initialCards.push(newCardTmp);//добавть карточки в конец списка
    renderItem(itemGridWrapper,newCardTmp);//отрисовка новой карточки перед всеми ранее
    hidePopup(); 
  }
}
//рендерим начальный список
initialCards.reverse().forEach((title) => {// REVERSE
  renderItem(itemGridWrapper, title)
})
//кнопки показа попапа
edit.addEventListener('click', showPopup); 
add.addEventListener('click', showPopup); 
