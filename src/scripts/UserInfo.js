export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameHTML = document.querySelector(nameSelector);
        this._infoHTML = document.querySelector(infoSelector);
        this._name = this._nameHTML.textContent.trim();
        this._info = this._infoHTML.textContent.trim();
    }

    getUserInfo() {
        return {name: this._name, info: this._info}
    }

    setUserInfo(data) {
        this._name = data.first;
        this._info = data.second;
        this._nameHTML.textContent = this._name;
        this._infoHTML.textContent = this._info;
    }
}