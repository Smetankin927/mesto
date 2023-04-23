import { Card } from "./Card.js";
import { FormValidator } from "./FormValidate.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
//NEW VERSION
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
const profile = document.querySelector('.profile');
const edit = profile.querySelector('.profile__edit-button');
const nameProfile = profile.querySelector('.profile__name');
const profProfile = profile.querySelector('.profile__name-subline');

//попап профиля/////////////////////////
/*const profilePopup = document.querySelector('.popup.popup_profile');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const profilePopupForm = profilePopupContainer.querySelector('.popup__input');
const profilePopupName = profilePopupContainer.querySelector('input[name = "first"]');
const profilePopupAbout = profilePopupContainer.querySelector('input[name = "second"]');
//слушатель на форму профиля
profilePopupForm.addEventListener('submit', updateProfile);
//попап карточки///////////////
const cardPopup  = document.querySelector('.popup.popup_place');
const cardPopupContainer = cardPopup.querySelector('.popup__container');
const cardPopupForm = cardPopupContainer.querySelector('.popup__input');
const cardPopupPlace = cardPopupContainer.querySelector('input[name = "first"]');
const cardPopupLink = cardPopupContainer.querySelector('input[name = "second"]');
/*
// кнопка закрыть попап 
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__button-close');

// с окончанием `s` нужно обязательно, так как много кнопок
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => hidePopup(popup));
});


//слушатель на форму карточки
cardPopupForm.addEventListener('submit', addCard);
//попап картинки///////////
const imgPopup = document.querySelector('.popup.popup_image');
const imgPopupContainer = imgPopup.querySelector('.popup__container-image');
const imgPopupImg = imgPopupContainer.querySelector('.popup__huge-image');
const imgPopupText = imgPopupContainer.querySelector('.popup__image-text');

//карточки кнопка эдд и окружение
const addButton = document.querySelector('.profile__add-button');
const itemGridWrapper = document.querySelector('.cards-grid');
const template = document.getElementById('template-card');
*/

const profilePopup = new PopupWithForm('.popup.popup_profile', updateProfile);
profilePopup.setEventListeners()

const imgPopup = new PopupWithImage('.popup.popup_image');
imgPopup.setEventListeners();

////////Валидация//////////////////////////////////////////////

const validationOptions = {
  submitSelector: '.popup__button-save',
  inputSelector: '.popup__input-text',
  inputSectionSelector: '.popup__section',
  inputErrorSelector: '.popup__input-error',
  inputErrorClass: 'popup__input-error_active',
  disabledButtonClass: 'popup__button-save_inactive',
};


const formValidatorProfile = new FormValidator(validationOptions, profilePopupForm);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(validationOptions, cardPopupForm);
formValidatorCard.enableValidation();
//////////////////////////////////////////////////////////////

// значения попапа профиля перед открытием
/*function setProfilePopupValues (){
  profilePopupName.value = nameProfile.textContent.trim();
  profilePopupAbout.value = profProfile.textContent.trim();
  //убираем ошибки формы
  formValidatorProfile.resetValidation();
}
//кнопки показа попапа
edit.addEventListener('click', (evt) => {
  // записываем значения профиля и сбрасываем errors
  setProfilePopupValues();
  //отображаем попап
  showPopup(profilePopup);
}); */

addButton.addEventListener('click', (evt) => {
  //сброс значений и валидации
  formValidatorCard.resetValidation();
  formValidatorCard.resetInputs();
  //показываем попап
  showPopup(cardPopup);
}); 

/*//все попапы
const popups = document.querySelectorAll('.popup');
// закрытие по оверлэю
function clickOverlayHidePopup (evt, popup){
  if(evt.target === evt.currentTarget){
    hidePopup(popup)
  }
}
popups.forEach(item => {
    item.addEventListener('click', (evt) =>{
      clickOverlayHidePopup (evt, item)
  });
})*/
//слушаем Escape
/*function listenEscape(evt){ 
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_active');
    hidePopup(popup);
  }
}*/

//универсальные функции
/*function showPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', listenEscape);
}

function hidePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', listenEscape);
}*/
//профиль функции
function updateProfile (evt) {
  evt.preventDefault();
  //
  nameProfile.textContent = profilePopupName.value.trim();
  profProfile.textContent = profilePopupAbout.value.trim();
  hidePopup(profilePopup); 
}



//карточки функции

function handleCardImage (cardName, cardImg) { //handleCardClick
  imgPopupImg.src = cardImg;
  imgPopupImg.alt = cardName; 
  imgPopupText.textContent = cardName;
  showPopup(imgPopup);
}

 /*
//отрисовываем карточки

function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const newCard = new Card(item, 'template-card', handleCardImage);
  return newCard.generateCard()
}

const renderItem = (wrap, cardObj) => {
  const cardElement = createCard(cardObj)
  wrap.prepend(cardElement)
}
*/

//добавляем карточки
function addCard(evt){
  evt.preventDefault();
  //
  const popupCardText = cardPopupPlace.value.trim();
  const popupCardLinks = cardPopupLink.value.trim();
  if(popupCardText && popupCardLinks){
    const newCardTmp = {name:popupCardText, link:popupCardLinks};//создаем новую временную карточку
    renderItem(itemGridWrapper,newCardTmp);//отрисовка новой карточки перед всеми ранее
    evt.target.reset();
    hidePopup(cardPopup); 
  }
}
/*
//рендерим начальный список
initialCards.reverse().forEach((title) => {// REVERSE
renderItem(itemGridWrapper, title)
})*/


