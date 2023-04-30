import './pages/index.css';
import { Api } from './scripts/Api.js';
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidate.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithConfirm } from './scripts/PopupWithConfirm.js';
import { UserInfo } from "./scripts/UserInfo.js";
import { Section } from "./scripts/Section.js";
import { validationOptions } from "./scripts/utils/constants.js";
//NEW VERSION
//кнопки сохранения
const profileSaveButton = document.querySelector(".popup__button-save-prof");
const placeSaveButton = document.querySelector(".popup__button-save-place");
const avatarSaveButton = document.querySelector(".popup__button-save-avat");

function setButtonText(button,onloadBool){
  if(button == placeSaveButton){
    if(onloadBool){button.textContent = "Рисую карточку"}
    else{button.textContent = "Coздать";}
  }
  if(button == profileSaveButton || button == avatarSaveButton){
    if(onloadBool){button.textContent = "Сохранение..."}
    else{button.textContent = "Coхранить";}
  }
}
//api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'bb51037e-40e9-4ec0-bf4f-63ccb84f68dd',
    'Content-Type': 'application/json'
  }
});
//профиль
const profile = document.querySelector('.profile');
const edit = profile.querySelector('.profile__edit-button');
//user Info профиль
const profileUserInfo = new UserInfo({nameSelector:'.profile__name', infoSelector:'.profile__name-subline', avatarSelector:'.profile__avatar'});

//попап профиля
const profilePopup = new PopupWithForm({
  popupSelector: '.popup.popup_profile', 
  handleFormSubmit: (formData)=>{
    updateProfile(formData);
  }});
profilePopup.setEventListeners()

//слушатель на кнопку профиля
edit.addEventListener('click', () => {
    profilePopup.setInputValues(profileUserInfo.getUserInfo());//fixme
    formValidatorProfile.resetValidation();
    profilePopup.open();
  }); 

//профиль функции
function updateProfile(data) {
    setButtonText(profileSaveButton, true)
    //здесь меняются попаповские first seond на name и about
    data['name'] = data['first'];
    data['about'] = data['second'];
    delete data['first'];
    delete data['second'];
    //
    api.updateProfileInfo(data)
      .then((resp)=>{
        profileUserInfo.setUserInfo(resp);
        profilePopup.close(); 
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setButtonText(profileSaveButton, false));
  }

////////Валидация//////////////////////////////////////////////

//импорт из consants

//валидация профиля
const formValidatorProfile = new FormValidator(validationOptions,profilePopup._form);
formValidatorProfile.enableValidation();

//аватар
//const avatarImg = document.querySelector('.profile__avatar');
const updateAvatarButton = profile.querySelector('.profile__avatar-button');
//попап аватара
const avatarPopup = new PopupWithForm({
  popupSelector: '.popup.popup_avatar', 
  handleFormSubmit: (formData)=>{
    updateAvatar(formData); // функция обновления аватара
  }
  });
  avatarPopup.setEventListeners()

//валидация аватара
const formValidatorAvatar = new FormValidator(validationOptions,avatarPopup._form);
formValidatorAvatar.enableValidation();
//слушатель на кнопку аватара
updateAvatarButton.addEventListener('click', () => {
  //fixme
  formValidatorAvatar.resetValidation();
  avatarPopup.open();
});
// аватар функции
function updateAvatar(data){
  //FIXME
  setButtonText(avatarSaveButton,true);
  api.updateAvatar(data.second)// потому что name=second у ссылки попапа
    .then((res) => {
      profileUserInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => setButtonText(avatarSaveButton, false));
}
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
  //здесь меняются попаповские first seond на name и link
  data['name'] = data['first'];
  data['link'] = data['second'];
  delete data['first'];
  delete data['second'];
  //
  setButtonText(placeSaveButton,true)
  api.postNewCard(data)
    .then((res)=>{
      const cardElement = createCard(res);
      cardList.prependItem(cardElement);
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(()=>{cardPopup.close(setButtonText(placeSaveButton,false));})
}
//функция для удаления карточки через попап колбэк
function deleteCard(card) {
  popupConfirm.open();
  popupConfirm.setConfirmFunction(()=>{
    api.deleteCard(card.id)
      .then(()=>{
        card.deleteCard();
        popupConfirm.close()
      }
      )
      .catch((error) => console.log(`Ошибка: ${error}`));
    })
}
//функция лайка
function setLike(card){
  api.likeCard(card.id)
  .then((res)=>{
    card.likesHTML.textContent = res.likes.length;
    card.likeButton.classList.toggle('cards-grid__like-button_active');
  })
  .catch((error) => {console.log(`Ошибка: ${error}`); return [];});
}
//функция дизлайка
function unsetLike(card){
  api.dislikeCard(card.id)
  .then((res)=>{
    card.likesHTML.textContent = res.likes.length;
    card.likeButton.classList.toggle('cards-grid__like-button_active');
  })
  .catch((error) => {console.log(`Ошибка: ${error}`); return [];});
}
//попап картинки
const imgPopup = new PopupWithImage(".popup.popup_image");
imgPopup.setEventListeners();
//функця показа изображения карточки
function handleCardImage (cardName, cardImg) { //handleCardClick
  imgPopup.open({src:cardImg, alt: cardName});//fix
}

//создаем  новый попап подтверждения и опрокидывам его в конструктор карточки
const popupConfirm = new PopupWithConfirm({ popupSelector: '.popup.popup_delCard'});
popupConfirm.setEventListeners();
//отрисовываем карточки
function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const newCard = new Card(
    item, 
    'template-card', 
    handleCardImage,
    setLike,
    unsetLike,
    deleteCard,
    //popupConfirm,
    profileUserInfo.id
    );
  return newCard.generateCard()
}
////////////////////////
// ./pages/index.js
const cardList = new Section({
  //data: initialCards, // здесь начальный список
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.setItem(cardElement);
    },
  },
  itemGridWrapSelector
);

//api отрисовываем начальные карточки
//api запрос информации профиля
Promise.all([api.takeUserInfo(), api.getInitialCards()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
      // тут установка данных пользователя
      profileUserInfo.setUserInfo(userData);
      // и тут отрисовка карточек
      cardList.renderItems(cards);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));


