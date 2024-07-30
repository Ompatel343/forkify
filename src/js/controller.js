import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';

// import icons from '../img/icons.svg'; //parcel 1
import icons from 'url:../img/icons.svg'; //parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

console.log(icons);

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRceipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1 loading recipe
    await model.loadRecipe(id); //await because loadRe cipe() is async function
    const { recipe } = model.state;

    // 2 rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSerchResults = async function () {
  try {
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2)load search results
    await model.loadSearchResults(query);

    // 3)render search
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

controlSerchResults();

init = function () {
  recipeView.addHandlerRender(controlRceipe);
  searchView.addHandlerSearch(controlSerchResults);
};

init();
