import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const BLANK_POINT = {
  basePrice: null,
  dateFrom: new Date(),
  dateTo: '',
  destination : null,
  offers:[],
  type: '',
  isFavorite: false,
};

export default class AbstractPointView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];

  constructor ({
    offers,
    destinations
  }) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }

  pointType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  get template () {
    return '';
  }

}

export {BLANK_POINT};
