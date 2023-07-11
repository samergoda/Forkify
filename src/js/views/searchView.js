class searchView{
_perentEle = document.querySelector('.search')

getQuery(){
    const query= this._perentEle.querySelector('.search__field').value
    this._clearInput()
    return query
}
 _clearInput(){
    this._perentEle.querySelector('.search__field').value =''
 }
 addHandlerSearch(handler){
    this._perentEle.addEventListener('submit',function(e){
        e.preventDefault()
        handler()
    })
    
 }

}
export default new searchView()