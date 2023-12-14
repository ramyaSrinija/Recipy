import 'core-js/stable';
import 'regenerator-runtime/runtime';  // polyfills
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';

if(module.hot){
    module.hot.accept();
}

const getRecipes = async () => {
    try{
        const id = window?.location?.hash?.slice(1);
        if(!id) return;
        recipeView.renderSpinner();
        await model.loadRecipes(id);
        resultsView.update(model.getRecipePerPage(model.state.searchResults.page))
        recipeView.render(model.state.recipe);
        bookmarkView.update(model.state.bookmarks);
    } catch(err) {
        recipeView.renderError(err)
    }
};

const getSearchRecipes = async () => {
    try{
        const search = searchView.getSearchValue();
        if(!search) return;
        resultsView.renderSpinner();

        await model.loadSearchRecipes(search);

        resultsView.render(model.getRecipePerPage(model.state.searchResults.page))

        paginationView.render(model.state.searchResults)
    } catch(err){
        resultsView.renderError(err);
    }
};

const paginationHandler = (page) => {
    model.state.searchResults.page = page;

    resultsView.render(model.getRecipePerPage(page))

    paginationView.render(model.state.searchResults)
}

const controlServings = (newServings) => {
    model.updateServings(newServings);

    recipeView.update(model.state.recipe);
}

const bookmarkHandler = () => {
    if(!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
    else model.removeBookmarks(model.state.recipe);
    recipeView.update(model.state.recipe)
    bookmarkView.render(model.state.bookmarks)
}

const loadBookmarks = () => {
    bookmarkView.render(model.state.bookmarks)
}

const init = () => {
    bookmarkView.addHandlerLoadBookmarks(loadBookmarks);
    recipeView.addHandlerRender(getRecipes);
    searchView.searchHandler(getSearchRecipes);
    paginationView.clickPagination(paginationHandler);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addBookmarkHandler(bookmarkHandler);
};
init();
