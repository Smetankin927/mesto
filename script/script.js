let profile = document.querySelector('.profile');
let edit = profile.querySelector('.profile__edit-button');
let NameProfile = profile.querySelector('.profile__name');
let ProfProfile = profile.querySelector('.profile__name-subline');

let popup = document.querySelector(".popup");
let popupContainer = popup.querySelector('.popup__container')
let popupClose = popupContainer.querySelector('.popup__button-close');
let popupSave = popupContainer.querySelector('.popup__button-save')

let popupInName = popupContainer.querySelector('input[name = "name"]');
let popupInProf = popupContainer.querySelector('input[name = "profession"]');

function showPopup() {
    popup.style.display = 'flex';
    popupInName.value = NameProfile.textContent.trim();
    popupInProf.value = ProfProfile.textContent.trim();
}

function hidePopup(){
    popup.style.display = 'none';
}

function updateProfile() {
    NameProfile.textContent = popupInName.value.trim();
    ProfProfile.textContent = popupInProf.value.trim();
    hidePopup(); 
}




edit.addEventListener('click', showPopup); 
popupClose.addEventListener('click', hidePopup);
popupSave.addEventListener('click', updateProfile) /*здесь будет submit*/