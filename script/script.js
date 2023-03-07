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

//попап профиля////////////////////////////////////////////////////////////////////
const profilePopup = document.querySelector('.popup.popup_profile');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const profilePopupForm = profilePopupContainer.querySelector('.popup__input');
const profilePopupName = profilePopupContainer.querySelector('input[name = "first"]');
const profilePopupAbout = profilePopupContainer.querySelector('input[name = "second"]');
//значения при открытии попапа прпофиля
profilePopupName.value = nameProfile.textContent.trim();
profilePopupAbout.value = profProfile.textContent.trim();
//кнопка закрыть попап эдит профиль
const profilePopupClose = profilePopupContainer.querySelector('.popup__button-close');
profilePopupClose.addEventListener('click', (evt) => {hidePopup(profilePopup);});
//слушатель на форму профиля
profilePopupForm.addEventListener('submit', updateProfile);
//попап карточки//////////////////////////////////////////////////////////////////////
const cardPopup  = document.querySelector('.popup.popup_place');
const cardPopupContainer = cardPopup.querySelector('.popup__container');
const cardPopupForm = cardPopupContainer.querySelector('.popup__input');
const cardPopupPlace = cardPopupContainer.querySelector('input[name = "first"]');
const cardPopupLink = cardPopupContainer.querySelector('input[name = "second"]');
//значения при открытии попапа карточки
cardPopupPlace.value = '';
cardPopupLink.value = '';
// кнопка закрыть попап эдд кард
const cardPopupClose = cardPopupContainer.querySelector('.popup__button-close');
cardPopupClose.addEventListener('click', (evt) => {hidePopup(cardPopup);});
//слушатель на форму карточки
cardPopupForm .addEventListener('submit', addCard);
//попап картинки////////////////////////////////////////////////////////////////////////
const imgPopup = document.querySelector('.popup.popup_image');
const imgPopupContainer = imgPopup.querySelector('.popup__container-image');
const imgPopupImg = imgPopupContainer.querySelector('.popup__huge-image');
const imgPopupText = imgPopupContainer.querySelector('.popup__image-text');
//значения при открытии попапа картинки (функция тк много разных)
function imgPopupValues(evt){
const cardTmptext = evt.target.nextElementSibling.querySelector('.cards-grid__text');//костыль?
console.log(evt.target.src.trim())
imgPopupImg.src = evt.target.src.trim();
imgPopupText.textContent = cardTmptext.textContent.trim();
}
//кнопка закрыть попап имадж
const imgPopupClose = imgPopupContainer.querySelector('.popup__button-close');
imgPopupClose .addEventListener('click', (evt) => {hidePopup(imgPopup);});
//карточки кнопка эдд и окружение
const addButton = document.querySelector('.profile__add-button');
const itemGridWrapper = document.querySelector('.cards-grid');
const template = document.getElementById('template-card');
//кнопки показа попапа
edit.addEventListener('click', (evt) => {showPopup(evt,profilePopup);}); 
addButton.addEventListener('click', (evt) => {showPopup(evt,cardPopup);}); 

//универсальные функции
function showPopup(evt, popup) {
  popup.classList.add('popup_active');
}

function hidePopup(popup){
popup.classList.remove('popup_active');
}
//профиль функции
function updateProfile (evt) {
  evt.preventDefault();
  //
  nameProfile.textContent = profilePopupName.value.trim();
  profProfile.textContent = profilePopupAbout.value.trim();
  hidePopup(profilePopup); 
}

//карточки функции
//лайкаем 
function reactionCard (evt) {
evt.target.classList.toggle('cards-grid__like-button_active');
}
//удаляем
function deleteCard (evt) {
evt.target.closest('.cards-grid__item').remove();
//удалить из списка!!!!
}


const getItemElement = (cardObj) => {
  //крафтим карточки
  const newCardItem = template.content.cloneNode(true);
  const newCardImage = newCardItem.querySelector('.cards-grid__image');
  const newCardText = newCardItem.querySelector('.cards-grid__text');
  newCardImage.src = cardObj.link;
  newCardImage.alt = cardObj.name; //alt for img
  newCardText.textContent = cardObj.name;
  // внешка карточек закончена
  //кнопка лайка
  const likeButton = newCardItem.querySelector('.cards-grid__like-button');
  likeButton.addEventListener('click', reactionCard);
  //кнопка удаления
  const deleteButton = newCardItem.querySelector('.cards-grid__trash-button');
  deleteButton.addEventListener('click', deleteCard);
  //
  newCardImage.addEventListener('click', (evt) => {showPopup(evt,imgPopup);});
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
const popupCardText = cardPopupPlace.value.trim();
const popupCardLinks = cardPopupLink.value.trim();
if(popupCardText && popupCardLinks){
  const newCardTmp = {name:popupCardText, link:popupCardLinks};//создаем новую временную карточку
  renderItem(itemGridWrapper,newCardTmp);//отрисовка новой карточки перед всеми ранее
  hidePopup(cardPopup); 
}
}
//рендерим начальный список
initialCards.reverse().forEach((title) => {// REVERSE
renderItem(itemGridWrapper, title)
})

