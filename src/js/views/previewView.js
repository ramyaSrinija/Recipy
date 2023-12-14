import View from "./view";

export default class PreviewView extends View {

    // _parentEl = document.querySelector(".previews__list");
    // _errorMsg = "No previews yet. Find a nice recipe and preview it :)"

    _generateHTML(){
        const id = window.location?.hash?.slice(1);
        return this._data?.map(preview => (
         `
            <li class="preview">
                <a class="preview__link ${preview?.id === id && 'preview__link--active'}" href=#${preview?.id}>
                  <figure class="preview__fig">
                    <img src=${preview?.image} alt=${preview?.title} />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${preview?.title}</h4>
                    <p class="preview__publisher">${preview?.publisher}</p>
                  </div>
                </a>
            </li>
        `
        )).join('');
    }
}

// export default new PreviewView();