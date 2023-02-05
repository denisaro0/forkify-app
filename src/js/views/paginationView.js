import View from './View.js';
import icons from 'url:../../img/icons.svg';
// import { RES_PER_PAGE } from '../config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      //   console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    const buttonNextHTML = ` 
        <button data-goto ="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;

    const buttonBackHTML = `
        <button data-goto ="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
        </button>`;

    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return buttonNextHTML;
    }

    //Last page
    if (curPage === numPages && numPages > 1) {
      return buttonBackHTML;
    }

    //Other page
    if (curPage < numPages) {
      return buttonBackHTML + buttonNextHTML;
    }

    //Page 1, and there are NOT other pages
    if (numPages === 1) return '';
  }
}

export default new PaginationView();
