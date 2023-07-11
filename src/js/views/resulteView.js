import previewView from "./previewView.js";
import View from "./view.js";
import icons from 'url:../../img/icons.svg'


class ResultesView extends View{
  _perentElement = document.querySelector('.results')
  _errorMessage ='No recipes found for your query! Please try again ;)';
  _message =''

  _generateMarkup(){
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultesView()