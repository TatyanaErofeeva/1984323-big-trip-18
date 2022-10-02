import AbstractView from '../framework/view/abstract-view';
import {FILTER_TYPE} from '../utils/const';

const ListEmptyType = {
  [FILTER_TYPE.EVERYTHING]:'Click New Event to create your first point' ,
  [FILTER_TYPE.FUTURE]: 'There are no future journey now',
  [FILTER_TYPE.PAST]: 'There are no past journey now'
};

const createEmptyListTemplate = (filterType) =>(
  `<p class="trip-events__msg">${ListEmptyType[filterType]}</p>`
);
export default class EmptyListOfPoints extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
