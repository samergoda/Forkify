import View from "./view.js";
import icons from 'url:../../img/icons.svg'


class PaginationView extends View{
  _perentElement = document.querySelector('.pagination')
 
  addHandlerClick(handler){
    this._perentElement.addEventListener('click',function (e) {
        const btn = e.target.closest('.btn--inline') 
        if (!btn) return
        const goTo = +btn.dataset.goto
        handler(goTo)
    })
  }

  _generateMarkup(){
    const currentPage = this._data.page
    const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage)
  console.log(numPages);
    // 1 page and other
    if (currentPage === 1 && numPages > 1) {
        return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    //last page
    if(currentPage === numPages && numPages>1){
        return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage-1}</span>
      </button>`
    }
    //other page
    if (currentPage < numPages) {
        return  `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage-1}</span>
      </button>

      <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `
    }
    return ''

}
}
export default new PaginationView()