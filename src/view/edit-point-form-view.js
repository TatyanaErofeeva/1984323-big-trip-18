import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatToDateWithTime} from '../mock/util.js';
import { DESTINATIONS, directions } from '../mock/destination.js';
import { ROUTE_POINT_TYPES } from '../mock/data.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  id: null,
  basePrice: null,
  dates: '',
  destination:'',
  type: Object.values(ROUTE_POINT_TYPES)[0],
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

const generateOffersList = (events, _state) => {
  let str = '';
  if (events.length > 0) {
    str += `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">`;
    events.forEach((element) => {
      str += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" value = "${element.id}"  id="event-offer-${element.name}" type="checkbox" name="event-offer-${element.name}" ${_state.offers.includes(element.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${element.name}">
        <span class="event__offer-title">${element.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${element.price}</span>
      </label>
    </div>`;
    });
    str += '</div></section>';
  }
  return str;
};

const generateTimeData = (start, finish) => `<div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatToDateWithTime(start)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatToDateWithTime(finish)}">
          </div>`;

const generateEventTypeList = (eventsObject, iconSrc, id, eventType) => {
  const eventsList = Object.keys(eventsObject);
  let events = '';
  eventsList.forEach((element) => {
    events += `<div class="event__type-item">
      <input id="event-type-${eventsObject[element].name.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}" ${(eventType === eventsObject[element].name) ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventsObject[element].name.toLowerCase()}" for="event-type-${eventsObject[element].name.toLowerCase()}-${id}">${eventsObject[element].name}</label>
    </div>`;
  });
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
      str += `<img class="event__photo" src=${element.src} alt="Event photo">`;
    });
  }
  return str;
};

const createEditTemplate = (_state = {}) => {
  const {id, dates, type, destination, basePrice} = _state;
  const {iconSrc, name, offers} = type;
  const {start, finish} = dates;
  const newPointList = directions.filter((element) => element !== destination.name);

  return (
    `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
    ${generateEventTypeList(ROUTE_POINT_TYPES, iconSrc, id, name)}

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${name}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
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
        <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${basePrice}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${generateOffersList(offers, _state)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${generatePhoto(destination.pictures)}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`
  );
};
export default class EditFormView extends AbstractStatefulView {
  #startDatepicker = null;
  #endDatepicker = null;

  constructor(point = BLANK_POINT) {
    super();
    this._state = EditFormView.parsePointToState(point);

    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  get template() {
    return createEditTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  };

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

  #changeTypePoint = ( evt ) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: ROUTE_POINT_TYPES[evt.target.value],
        offers: []
      });
    }
  };

  #changeOffer = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__offer-checkbox')) {
      this._setState({
        offers: evt.target.checked
          ? [...this._state.offers, evt.target.value]
          : this._state.offers.filter(( item ) => item !== evt.target.value),
      });
    }
  };

  #changeDestination = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: DESTINATIONS.find((element) => element.name === evt.target.value)
    });
  };

  #changePrice = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  reset = (point) => {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
    this.setFormClickHandler(this._callback.click);
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypePoint );
    const offers = this.element.querySelector('.event__available-offers');
    if (offers) {
      offers.addEventListener('change', this.#changeOffer );
    }
    this.element.querySelector('.event__input--destination').addEventListener( 'change', this.#changeDestination );
    this.element.querySelector('.event__input--price').addEventListener( 'input', this.#changePrice );
  };

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dates: {
        ...this._state.dates,
        start: [userDate],
      }
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dates: {
        ...this._state.dates,
        finish: [userDate],
      }
    });
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.start,
        onChange: this.#startDateChangeHandler,
      }
    );
  };

  #setEndDatepicker = () => {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.finish,
        minDate: this._state.start,
        onChange: this.#endDateChangeHandler,
      }
    );
  };

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) =>({ ...state });

}
