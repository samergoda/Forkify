import View from "./view.js";
import icons from 'url:../../img/icons.svg'


class AddRecipeView extends View{
  _perentElement = document.querySelector('.upload')
  _message ='Recipe add successfully uploaded :)'
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

 constructor(){
    super()
    this._addHendlerShowWindow()
    this._addhendlerHideWindow()
 }
 toggleWindow(){
     this._overlay.classList.toggle('hidden')
     this._window.classList.toggle('hidden') 
 }
 _addHendlerShowWindow(){
    this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
   
 }
 _addhendlerHideWindow(){
    this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
    this._overlay.addEventListener('click',this.toggleWindow.bind(this))

 }
 addHendlerUpload(hendler){
    this._perentElement.addEventListener('submit',function (e) {
       e.preventDefault()
       const dataArr = [...new FormData(this) ]
       const data = Object.fromEntries(dataArr)
       hendler(data)
    })
 }

  _generateMarkup(){

}
}
export default new AddRecipeView()