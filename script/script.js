let profile = document.querySelector('.profile');
let edit = profile.querySelector('.profile__edit-button');
let nameProfile = profile.querySelector('.profile__name');
let profProfile = profile.querySelector('.profile__name-subline');

let popup = document.querySelector(".popup");
let popupContainer = popup.querySelector('.popup__container')
let popupClose = popupContainer.querySelector('.popup__button-close');
let popupForm = popupContainer.querySelector('.popup__input');

let popupInName = popupContainer.querySelector('input[name = "name"]');
let popupInProf = popupContainer.querySelector('input[name = "profession"]');

function showPopup() {
    popup.classList.add('popup_active');
    popupInName.value = nameProfile.textContent.trim();
    popupInProf.value = profProfile.textContent.trim();
}

function hidePopup(){
    popup.classList.remove('popup_active');
}

function updateProfile (evt) {
    evt.preventDefault();
    nameProfile.textContent = popupInName.value.trim();
    profProfile.textContent = popupInProf.value.trim();
    hidePopup(); 
}




edit.addEventListener('click', showPopup); 
popupClose.addEventListener('click', hidePopup);
popupForm.addEventListener('submit', updateProfile); /*здесь будет submit*/
