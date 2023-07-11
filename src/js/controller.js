import * as modal from './modal.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resulteView from './views/resulteView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addrecipeview from './views/addrecipeview.js';

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




if (modal.hot) {
  modal.hot.accept()
}




const controlRecipes = async function () {
  try{
    const id = window.location.hash.slice(1)
    if(!id) return
    recipeView.spinner()

// 1) loading recipe
await modal.loadRecipe(id)
  // const {recipe}=modal.state

// console.log(recipe);
recipeView.render(modal.state.recipe)


  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResult = async function () {
  try{
    resulteView.spinner()
    const query =searchView.getQuery()
    if (!query) return
    await modal.loadSearchResult(query)
    // console.log(modal.state.search.results);
    // resulteView.render(modal.state.search.results)
    resulteView.render(modal.getSerachResultePage())
    paginationView.render(modal.state.search)
  }catch(err){
    console.log(err);
  }
}
const paginationControler = function (goTo) {
  resulteView.render(modal.getSerachResultePage(goTo))
  paginationView.render(modal.state.search)
}

const controlServing = function (newServing) {
  modal.updateServing(newServing)
  
  recipeView.render(modal.state.recipe)
}
const controlBookmark = function(){
  //add / remove bookmarks
  console.log(modal.state.bookmarks);
  if (!modal.state.recipe.bookmarks) modal.addBookmark(modal.state.recipe)
  else modal.deletbookmark(modal.state.recipe.id)

  
  // console.log(modal.state.recipe);
  //update recpie view
  recipeView.render(modal.state.recipe)

  bookmarksView.render(modal.state.bookmarks)
}

const controlBookmarks = function(){
bookmarksView.render(modal.state.bookmarks)
}

const controlAddRecipe= async function(newRecipe){
try{
  addrecipeview.spinner()
 await modal.uploadRecpie(newRecipe)
//  console.log(modal.state.recipe);
 recipeView.render(modal.state.recipe)

 addrecipeview.renderMessage()
 
 bookmarksView.render(modal.state.bookmarks)
 window.history.pushState(null,'',`#${modal.state.recipe.id}`)

 setTimeout(function(){
  addrecipeview.toggleWindow()
 },2500)

}catch(err){
  console.error(err);
  addrecipeview.renderError(err.message)
}
}
const init = function(){
  bookmarksView.addHendlerRender(controlBookmarks)
  recipeView.addHendlerRender(controlRecipes)
  recipeView.addHendlerUpdateServing(controlServing)
  recipeView.addHendlerBookmark(controlBookmark)
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerClick(paginationControler)
  addrecipeview.addHendlerUpload(controlAddRecipe)
}
init()


