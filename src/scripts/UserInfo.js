export class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._nameHTML = document.querySelector(nameSelector);
        this._infoHTML = document.querySelector(infoSelector);
        this._avatarHtml = document.querySelector(avatarSelector);
        this._name = this._nameHTML.textContent.trim();
        this._info = this._infoHTML.textContent.trim();
    }

    getUserInfo() {
        return {first: this._name, second: this._info}
    }

    setUserInfo(data) {
        this._name = data.name;
        this._info = data.about;
        this.id = data._id;
        this._avatar = data.avatar;
        this._nameHTML.textContent = this._name;
        this._infoHTML.textContent = this._info;
        this._avatarHtml.src = data.avatar;
    }
}