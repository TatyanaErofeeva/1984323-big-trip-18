import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DESTINATIONS_ARRAY, formatToDateWithTime, ROUTE_POINT_TYPES} from '../mock/const.js';
import { getRandomInteger, getNumberFromString} from '../mock/util.js';

const BLANK_POINT = {
  id: null,
  basePrice: null,
  dates: '',
  destination:'',
  type:'',
  offers: [],
  description: '',
  photos: [],
  isFavorite: false,
};

const generateDistDatalist = (destinations) => {
  let str = '';
  destinations.forEach((element) => {
    str += `<option value='${element}'></option>`;
  });
  return str;
};

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

const generateTimeData = (start, finish, id) => `<div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatToDateWithTime(start)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatToDateWithTime(finish)}">
          </div>`;

const generateEventTypeList = (eventsObject, iconSrc, id, eventType) => {
  const eventsList = Object.keys(eventsObject);
  let events = '';
  for (let i = 0; i < eventsList.length; i++) {
    events += `<div class="event__type-item">
                          <input id="event-type-${eventsObject[eventsList[i]].name.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventsList[i]}" ${(eventType === eventsObject[eventsList[i]].name) ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${eventsObject[eventsList[i]].name.toLowerCase()}" for="event-type-${eventsObject[eventsList[i]].name.toLowerCase()}-${id}">${eventsObject[eventsList[i]].name}</label>
                        </div>`;
  }
  return `<div class="event__type-wrapper">
                      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src=${iconSrc} alt="Event type icon">
                      </label>
                      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
                      <div class="event__type-list">
                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Event type</legend>
                          ${events}
                        </fieldset>
                      </div>
                    </div>`;
};

const generatePhoto = (photosList) => {
  let str = '';
  if (photosList.length > 0) {
    photosList.forEach((element) => {
      str += `<img class="event__photo" src=${element} alt="Event photo"></img>`;
    });
  }
  return str;
};

const createEditTemplate = (_state = {}) => {
  const {id, dates, type, destination, description, offers, photos} = _state;
  const {iconSrc, name, price} = type;
  const {start, finish} = dates;
  const newPointList = DESTINATIONS_ARRAY.filter((element) => element !== destination);

  return (
    `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
    ${generateEventTypeList(ROUTE_POINT_TYPES, iconSrc, id, name)}

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${name}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
        ${generateDistDatalist(newPointList)}
        </datalist>
      </div>
      ${generateTimeData(start, finish, id)}

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${price}">
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
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${generatePhoto(photos)}
          </div>
        </div>
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
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypePoint );
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOffer );
    this.element.querySelector('.event__input--destination').addEventListener( 'change', this.#changeDestination );
    this.element.querySelector('.event__input--price').addEventListener( 'input', this.#changePrice );
  };

  #changeTypePoint = ( evt ) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: ROUTE_POINT_TYPES[evt.target.value],
        offers: [],
      });
    }
  };

  #changeOffer = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__offer-checkbox')) {
      const isTrue = this._state.offers.includes(getNumberFromString(evt.target.id));
      const numberId = getNumberFromString( evt.target.id );
      this._setState({
        offers: !isTrue ? [...this._state.offers, numberId] : this._state.offers.filter(( item ) => item !== numberId ),
      });
    }
  };

  #changeDestination = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value,
    });
  };

  #changePrice = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  reset = (point) => {
    this.updateElement(
      EditFormView.parsePointToState(point),
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
