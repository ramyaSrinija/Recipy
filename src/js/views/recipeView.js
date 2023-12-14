import { Fraction } from 'fractional';
import View from './view';

class recipeView extends View {
    _parentEl = document.querySelector(".recipe");

    addHandlerRender(handler) {
      ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }

    addHandlerUpdateServings(handler) {
      this._parentEl.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn--tiny');
        if(!btn) return;
        const updatedServings = +btn.dataset.update;
        if(updatedServings > 0) handler(updatedServings);
      })
    }

    addBookmarkHandler(handler) {
      this._parentEl.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn--bookmark');
        if(!btn) return;
        handler();
      })
    }

    _renderIngredients = (ingredients) => {
        return ingredients?.map((ingredient) => {
           return  `<li class="recipe__ingredient">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16">
                       <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                       <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z"/>
                   </svg>
                   &nbsp;
               <div class="recipe__quantity">${ingredient?.quantity? new Fraction(ingredient?.quantity).toString() : '' }</div>
               <div class="recipe__description">
                 <span class="recipe__unit">${ingredient?.unit || ''}</span>
                 ${ingredient?.description || ''}
               </div>
             </li>`
        })?.join('')
    }

    _generateHTML(){
        return `
        <figure class="recipe__fig">
          <img src=${this._data?.image} alt=${this._data?.title} class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data?.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <span class="recipe__info-data recipe__info-data--minutes">${this._data?.minutes}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <span class="recipe__info-data recipe__info-data--people">${this._data?.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update=${this._data?.servings - 1}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update=${this._data?.servings + 1}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </button>
            </div>
          </div>
          <button class="btn--round btn--bookmark">
            ${this._data?.bookmarked ? (
              ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
                <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
              </svg>`
            ) : `
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-bookmark" viewBox="0 0 16 16">
                   <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>                   
                 </svg>
            `}
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
              ${this._renderIngredients(this._data?.ingredients)}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data?.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href=${this._data?.sourceUrl}
            target="_blank"
          >
            <span>Directions</span>
          </a>
        </div>
        `
    }
};

export default new recipeView();