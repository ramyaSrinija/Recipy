import View from "./view";

class PaginationView extends View {
    _parentEl = document.querySelector(".pagination")

    clickPagination(handler) {
       this._parentEl.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn--inline');
        if(!btn) return;

        const goTo = +btn.dataset.goto;
        handler(goTo);
       })
    }

    _generateHTML() {
        const numOfPages = Math.ceil(this._data?.results?.length / this._data.recipesPerPage);
        const currPage = this._data.page;
        if( currPage === 1 && numOfPages > 1 ) {
            return `
            <button data-goto= ${currPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                    </svg>
            </button> `
        }
        if(numOfPages === currPage && numOfPages > 1 ) {
            return `
                <button data-goto= ${currPage - 1} class="btn--inline pagination__btn--prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                             <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
                        <span>Page ${currPage - 1}</span>
                </button>
            `
        }
        if(currPage < numOfPages ) {
            return `
            <button data-goto= ${currPage - 1} class="btn--inline pagination__btn--prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                         <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                    <span>Page ${currPage - 1}</span>
            </button>
            <button data-goto= ${currPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
            </button> 
        `
        }
        return '';
    }
}

export default new PaginationView();