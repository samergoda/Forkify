import { API_URL, key } from "./config.js"
import {AJAX} from "./helpers.js"
import addrecipeview from "./views/addrecipeview.js";

export const state = {
   recipe:{},
   search:{
    query:'',
    results:[],
    page: 1,
    resultPerPage : 10,
   },
   bookmarks:[]
 }

 const creatrecipeObject = function(data){
  const {recipe} = data.data
        return {
        id:recipe.id,
        title:recipe.title,
        image:recipe.image_url,
        servings:recipe.servings ,
        publisher:recipe.publisher,
        sourceUrl:recipe.source_url,
        ingredients:recipe.ingredients,
        cookingTime:recipe.cooking_time,
        ...(recipe.key&&{key : recipe.key }),
        }
 }
 export const loadRecipe = async function (id) {
    try{
      const data = await AJAX(`${API_URL}/${id}?key=${key}`);
      state.recipe = creatrecipeObject(data)
    // console.log(data);
        const {recipe} = data.data
        state.recipe={
        id:recipe.id,
        title:recipe.title,
        image:recipe.image_url,
        servings:recipe.servings ,
        publisher:recipe.publisher,
        sourceUrl:recipe.source_url,
        ingredients:recipe.ingredients,
        cookingTime:recipe.cooking_time,
        }
        if(state.bookmarks.some(bookmark =>bookmark.id === id))
        state.recipe.bookmarks =true
        else state.recipe.bookmarks = false
        
        // console.log(state.recipe);
    }catch (err){
        alert(err)
    }
 }


 export const loadSearchResult = async function(query){
  try{
    state.search.query = query
    const data = await AJAX(`${API_URL}?search=${query}&key=${key}`);
    // console.log(data);
    state.search.results=data.data.recipes.map(rec=>{
      return{
        id:rec.id,
        title:rec.title,
        image:rec.image_url,
        publisher:rec.publisher,
        ...(rec.key&&{key : rec.key }),
      }
      
    })



  }catch(err){
    console.log(err);
    throw err
  }
 }


export const getSerachResultePage = function (page = state.search.page) {
  state.search.page = page
  const start = (page-1)* state.search.resultPerPage
  const end = page* state.search.resultPerPage
  return state.search.results.slice(start,end)
}


export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServing;
}

const presistbookmarks = function () {
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe)
  // console.log(recipe);
  if( recipe.id === state.recipe.id) state.recipe.bookmarks = true
  presistbookmarks()
}

export const deletbookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id ===id)
  state.bookmarks.splice(index, 1);
  if(id === state.recipe.id) state.recipe.bookmarks = false
  
  presistbookmarks()
}
const init = function (){
  const storage = localStorage.getItem('bookmarks')
  if (storage) state.bookmarks = JSON.parse(storage)
}
init()


const clearBookmarks = function(){
  localStorage.clear('bookmarks')
}
// clearBookmarks()


export const uploadRecpie = async function (newRecipe){
  try{
  
const ingredients = Object.entries(newRecipe).filter(entry=>entry[0].startsWith('ingredient')&&
 entry[1]!== '').map(ing=>{
  // const ingArr = ing[1].replaceAll(' ','').split(',')
  const ingArr = ing[1].split(',').map(el => el.trim());
  if(ingArr.length!==3) throw new Error ('wrong ingredient format! Please use the correct format :)')
 const [quantity,unit,description]= ingArr
return {quantity:quantity ? +quantity : null ,unit, description}})

const recipe ={
  title: newRecipe.title,
  source_url: newRecipe.sourceUrl,
  image_url: newRecipe.image,
  publisher: newRecipe.publisher,
  cooking_time: +newRecipe.cookingTime,
  servings: +newRecipe.servings,
  ingredients,
}


const data = await AJAX(`${API_URL}?key=${key}`, recipe)
state.recipe = creatrecipeObject(data)
addBookmark(state.recipe)
}
catch(err){
  throw err
}

}