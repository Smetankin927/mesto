
export class Api {
  constructor(options) {
    // тело конструктора
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._cohortId = 'cohort-64';
  }

  _checkResponse(res) {
    if (res.ok) {    
      return res.json();
    }
  // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

  updateProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)//обновленные данные
    }).then(this._checkResponse)
  }

  updateAvatar(newlink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newlink,
      })
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }


  takeUserInfo() { 
    return fetch(`${this._url}/users/me`, { 
      method: "GET", 
      headers: this._headers, 
    }).then(this._checkResponse);
  }
  
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

    
  }