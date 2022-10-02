import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filter, currentFilter) => {
  const {name, type} = filter;
  return (
    `<div class="trip-filters__filter">
       <input 
         id="filter-${name}" 
         class="trip-filters__filter-input  visually-hidden" 
         type="radio" 
         name="trip-filter" 
         value="${name}"  
         ${type === currentFilter ? 'checked' : ''}
       >
       <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
     </div>`);
};

const createFilterTemplate = (filters, currentFilter)=>{
  const AllFilters = filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
       ${AllFilters}
       <button 
         class="visually-hidden" 
         type="submit">
         Accept filter
       </button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType){
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
