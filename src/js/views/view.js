export default class View {
    _data;

    _clear() {
        this._parentEl.innerHTML = '';
    }

    render(data){
        if(!data || ( Array.isArray(data) && data?.length === 0)) return this.renderError();
        this._data = data;
        const html = this._generateHTML();
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', html);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateHTML();
    
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    
        newElements.forEach((newEl, i) => {
          const curEl = curElements[i];
          if (
            !newEl.isEqualNode(curEl) &&
            newEl.firstChild?.nodeValue.trim() !== ''
          ) {
            curEl.textContent = newEl.textContent;
          }
    
          if (!newEl.isEqualNode(curEl))
            Array.from(newEl.attributes).forEach(attr =>
              curEl.setAttribute(attr.name, attr.value)
            );
        });
      }

    renderSpinner(){
        const html = `
            <div class="spinner">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
            </div>
        `
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', html);
    }
    
    renderError(message = this._errorMsg) {
          const html = `
          <div class="error">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              <p>${message}</p>
          </div>
          `
          this._clear();
          this._parentEl.insertAdjacentHTML('afterbegin', html);
    }
};