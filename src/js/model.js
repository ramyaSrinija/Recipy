import { API_URL, REC_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe:{},
  searchResults: {
    searchValue: '',
    results: [],
    recipesPerPage: REC_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipes = async(id) => {
  try{
    const response = await getJSON(`${API_URL}${id}`);
    const {recipe} = response?.data;
    state.recipe = {
        id: recipe?.id,
        title: recipe?.title,
        publisher: recipe?.publisher,
        sourceUrl: recipe?.source_url,
        image: recipe?.image_url,
        servings: recipe?.servings,
        ingredients: recipe?.ingredients,
        minutes: recipe?.cooking_time,
    };

    if(state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

  } catch(err){
    throw err;
  }
};

export const loadSearchRecipes = async (searchValue) => {
  try {
    state.searchResults.page = 1;
    const response = await getJSON(`${API_URL}?search=${searchValue}`);
    const {recipes} = response?.data;
    
    state.searchResults.searchValue = searchValue;
    state.searchResults.results = recipes?.map(recipe => ({
      id: recipe?.id,
      title: recipe?.title,
      publisher: recipe?.publisher,
      image: recipe?.image_url,
    }))
  } catch(err) {
    throw err;
  }
}

export const getRecipePerPage = (page = state.searchResults.page) => {
  // state.searchResults.page = page;
  const start = (page - 1) * state.searchResults.recipesPerPage;
  const end = page * state.searchResults.recipesPerPage;

  return state.searchResults.results?.slice(start, end);
}

export const updateServings = (newServings) => {
  state.recipe.ingredients.map(ing => {
    ing.quantity = (newServings * ing.quantity) / state.recipe.servings
  })

  state.recipe.servings = newServings;
}

const storeBoookmarks = () => {
  const json = JSON.stringify(state.bookmarks)
  localStorage.setItem('bookmarks', json);
}

export const addBookmarks = (recipe) => {
  if(!recipe) return;
  state.bookmarks.push(recipe);
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  storeBoookmarks();
}

export const removeBookmarks = (recipe) => {
  if(!recipe) return;
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === recipe.id);
  state.bookmarks.splice(index, 1);

  if(recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  storeBoookmarks();
}

const init = () => {
  const json = localStorage.getItem('bookmarks');
  if(json) state.bookmarks = JSON.parse(json);
}

init();