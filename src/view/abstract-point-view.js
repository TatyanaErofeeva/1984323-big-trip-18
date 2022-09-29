import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const BLANK_POINT = {
  basePrice: null,
  dates: {
    start: new Date(),
    finish: '',
  },
  destination : {
    id: null,
    description: '',
    name: '',
    pictures: [],
  },
  offers:[],
  type: {},
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

  get selectedType() {
    return this.#offers.find((offer) => offer.type === this._state.type);
  }

  get template () {
    return '';
  }

}

export {BLANK_POINT};
