import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DESTINATIONS_ARRAY, formatToDateWithTime} from '../mock/const.js';
import { getRandomInteger, getNumberFromString} from '../mock/util.js';

const BLANK_POINT = {
  id: null,
  basePrice: null,
  dates: '',
  destination:'',
  type:{},
  offers: {},
  description: '',
  photos: [],
  isFavorite: false,
};

const destinationName = () => DESTINATIONS_ARRAY.map((element) => `<option value='${element}'></option>`).join('');
const destinationList = destinationName();

const generateOffersList = (events) => {
  let str = '';
  if (events.length > 0) {
    str += `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">`;
    events.forEach((element) => {
      str += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${element}-1" type="checkbox" name="event-offer-${events[element]}" ${getRandomInteger() ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${element}-1">
        <span class="event__offer-title">${element['name']}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${element['price']}</span>
      </label>
    </div>`;
    });
    str += '</div></section>';
  }
  return str;
};

const createEditTemplate = (_state = {}) => {
  const {dates, type, destination, description, offers} = _state;
  const {iconSrc, name, price} = type;
  const {start, finish} = dates;
  return (
    `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="${iconSrc}" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${destination}">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${name}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${destinationList}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatToDateWithTime(start)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatToDateWithTime(finish)}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${generateOffersList(offers)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
      </section>
    </section>
  </form>
</li>`
  );
};
export default class EditFormView extends AbstractStatefulView {
  constructor(point = BLANK_POINT) {
    super();
    this._state = EditFormView.parsePointToState(point);

    this.#setInnerHandlers();
  }

  get template() {
    return createEditTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToPoint(this._state));
  };

  setFormClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formClickHandler);
  };

  #formClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypePoint );
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#changeOffer );
    this.element.querySelector('#event-destination-1').addEventListener( 'change', this.#changeDestination );
    this.element.querySelector('#event-price-1').addEventListener( 'input', this.#changePrice );
  };

  #changeTypePoint = ( evt ) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };

  #changeOffer = ( evt ) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__offer-checkbox')) {
      const isTrue = this._state.offers.includes(getNumberFromString(evt.target.id));
      const numberId = getNumberFromString( evt.target.id );

      this._setState({
        offers: !isTrue ? [...this._state.offers, numberId] : this._state.offers.filter(( item ) => item !== numberId ),
      });
    }
  };

  #changeDestination = ( evt ) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value,
    });
  };

  #changePrice = ( evt ) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  reset = ( point ) => {
    this.updateElement(
      EditFormView.parsePointToState( point ),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormClickHandler(this._callback.click);
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    return point;
  };
}
