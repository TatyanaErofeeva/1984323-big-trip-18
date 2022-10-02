import AbstractView from '../framework/view/abstract-view';

const createSortTemplate = ({ item, id, name, disabled }, currentSortType) =>
  (
    `<div class="trip-sort__item  trip-sort__item--${ item }">
       <input 
        id="${ id }" 
        class="trip-sort__input  visually-hidden" 
        type="radio" 
        name="trip-sort" value="${ id }" 
        ${ currentSortType === id ? 'checked' : '' } 
        ${ disabled ? 'disabled' : '' } 
       >
       <label class="trip-sort__btn" for="${ id }">${ name }</label>
    </div>`
  );


export default class SortView extends AbstractView {
  constructor(SortData, currentSortType) {
    super();
    this.SortData = SortData;
    this.currentSortType = currentSortType;
  }

  get template() {
    const sortList = this.SortData.map(( item ) => createSortTemplate( item, this.currentSortType )).join('');
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              ${ sortList }
            </form>`;
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  };


  #sortTypeChangeHandler = ( evt ) => {
    if ( evt.target.classList.contains('trip-sort__input') ) {
      this._callback.sortTypeChange(evt.target.value);
    }
  };

}
