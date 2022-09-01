import AbstractView from '../framework/view/abstract-view';

const createSortTemplate = ({ id, name, checked, disabled }) => (
  `<div class="trip-sort__item  trip-sort__item--${ id }">
  <input id="sort-${ id }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ id }" ${ checked ? 'checked' : '' } ${ disabled ? 'disabled' : '' } >
  <label class="trip-sort__btn" for="sort-${ id }">${ name }</label>
</div>`
);

export default class SortView extends AbstractView {

  constructor( sortData ) {
    super();
    this.sortData = sortData;
  }

  get template() {
    const sortList = this.sortData.map(( item ) => createSortTemplate( item )).join('');

    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              ${ sortList }
            </form>`;
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };


  #sortTypeChangeHandler = ( evt ) => {
    if ( evt.target.classList.contains('trip-sort__input') ) {
      this._callback.sortTypeChange(evt.target.id);
    }
  };

}
