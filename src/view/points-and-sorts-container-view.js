import {createElement} from '../render.js';

const createPointsAndSortsTemplate = () => (
  `<section class="trip-events">
  </section>`
);

export default class PointsAndSortsView {
  #element = null;

  get template() {
    return createPointsAndSortsTemplate;
  }

  get element() {
    if(!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

}
