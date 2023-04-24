import './pages/index.css';
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidate.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { Section } from "./scripts/Section.js";
import { initialCards } from "./scripts/utils/constants.js";
//NEW VERSION

//профиль
const profile = document.querySelector('.profile');
const edit = profile.querySelector('.profile__edit-button');
//user Info профиль
const profileUserInfo = new UserInfo({nameSelector:'.profile__name', infoSelector:'.profile__name-subline'});

//попап профиля
const profilePopup = new PopupWithForm({
  popupSelector: '.popup.popup_profile', 
  handleFormSubmit: (formData)=>{
    updateProfile(formData);
  }
  });
profilePopup.setEventListeners()

//слушатель на кнопку профиля
edit.addEventListener('click', () => {
    profilePopup.setInputValues(profileUserInfo.getUserInfo());//fixme
    formValidatorProfile.resetValidation();
    profilePopup.open();
  }); 

//профиль функции
function updateProfile (data) {
    profileUserInfo.setUserInfo(data)
    profilePopup.close(); 
  }

////////Валидация//////////////////////////////////////////////

const validationOptions = {
  submitSelector: '.popup__button-save',
  inputSelector: '.popup__input-text',
  inputSectionSelector: '.popup__section',
  inputErrorSelector: '.popup__input-error',
  inputErrorClass: 'popup__input-error_active',
  disabledButtonClass: 'popup__button-save_inactive',
};

//валидация профиля
const formValidatorProfile = new FormValidator(validationOptions,profilePopup._form);
formValidatorProfile.enableValidation();
  
//карточки
//карточки ADD Template Wrapper 
const addButton = document.querySelector('.profile__add-button');
const itemGridWrapper = document.querySelector('.cards-grid');
const itemGridWrapSelector = '.cards-grid';
const template = document.getElementById('template-card');
//попап добавления карточки 
const cardPopup = new PopupWithForm({
  popupSelector: '.popup.popup_place', 
  handleFormSubmit: (formData)=>{
    addCard(formData); // функция добавления карточки в грид
  }
  });
cardPopup.setEventListeners()
//слушатель на кнопку добавления карточки 

addButton.addEventListener('click', () => {
  //сброс значений и валидации
  formValidatorCard.resetValidation();
  formValidatorCard.resetInputs();
  //показываем попап
  cardPopup.open();
}); 
//валидация карточки
const formValidatorCard = new FormValidator(validationOptions,cardPopup._form);
formValidatorCard.enableValidation();


//карточки функции
function addCard(data){
  const popupCardText = data.first;
  const popupCardLinks = data.second;
  if(popupCardText && popupCardLinks){
    const newCardObj = {name:popupCardText, link:popupCardLinks};//создаем новую временную карточку
    const cardElement = createCard(newCardObj);
    cardList.prependItem(cardElement);
    cardPopup.close(); 
  }
}
//попап картинки
const imgPopup = new PopupWithImage(".popup.popup_image");
imgPopup.setEventListeners();
//функця показа изображения карточки
function handleCardImage (cardName, cardImg) { //handleCardClick
  imgPopup.open({src:cardImg, alt: cardName});//fix
}

//отрисовываем карточки
function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const newCard = new Card(item, 'template-card', handleCardImage);
  return newCard.generateCard()
}


  ////////////////////////
// ./pages/index.js
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.setItem(cardElement);
    },
  },
  itemGridWrapSelector
);


cardList.renderItems();