class SearchView {
    _parentEl = document.querySelector(".search");

    getSearchValue() {
        const value = this._parentEl.querySelector(".search__field").value
        this._clear();
        return value;
    }

    _clear(){
        this._parentEl.querySelector(".search__field").value = "";
    }

    searchHandler(handler){
        this._parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView();