export  class Section {
    constructor({ /*data,*/ renderer }, selector) {
      //this._renderedItems = data;
      this._renderer = renderer; 
      this._container = document.querySelector(selector);
    }
  
    renderItems(data) {
      /*this._renderedItems.forEach(item => this._renderer(item));*/
      data.forEach(item => this._renderer(item));
    }
  
    prependItem(element) {
      this._container.prepend(element);//fix
    }
  
    setItem(element) {
      this._container.append(element);//fix
    }
  }
