import AbstractPointView from './abstract-point-view.js';
import { BLANK_POINT } from './abstract-point-view.js';
import { getUpperCaseFirstLetter} from '../utils/util.js';
import { formatToDateWithTime } from '../utils/date.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const generateDistDatalist = (destinations) => destinations
  .map((element) => `<option value='${element}'></option>`).join('');

const generateOffersList = (offers, _state, isDisabled) => {
  if (!offers.length) {
    return '';
  }
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((offer) => (
    `<div class="event__offer-selector">
             <input
               class="event__offer-checkbox  visually-hidden"
                value = "${offer.id}"
                id="event-offer-${offer.title}"
                type="checkbox"
                name="event-offer-${offer.title}"
                ${_state.offers.includes(offer.id) ? 'checked' : ''}
                ${isDisabled ? 'disabled' : ''}
              >
              <label class="event__offer-label" for="event-offer-${offer.title}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
           </div>`
  )).join('')}
     </div>
     </section>
     `;
};

const generateTimeData = (start, finish) =>
  `<div class="event__field-group  event__field-group--time">
     <label class="visually-hidden" for="event-start-time-1">
       From
     </label>
     <input
       class="event__input  event__input--time"
       id="event-start-time-1"
       type="text"
       name="event-start-time"
       value="${start ? formatToDateWithTime(start) : ''}"
       required
     >
     &mdash;
     <label class="visually-hidden" for="event-end-time-1">To</label>
     <input class="event__input  event__input--time"
       id="event-end-time-1"
       type="text"
       name="event-end-time"
       value="${finish ? formatToDateWithTime(finish) : ''}"
       required
     >
   </div>`;

const generateEventTypeList = (eventsObject, id, eventType) => {
  const eventsList = eventsObject.map(({type}) => type);
  let events = '';
  eventsList.forEach((element) => {
    events += `<div class="event__type-item">
      <input
        id="event-type-${element}-${id}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${element}"
        ${(eventType === element) ? 'checked' : ''}
      >
      <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-${id}">
        ${getUpperCaseFirstLetter(element)}
      </label>
    </div>`;
  });
  return `<div class="event__type-wrapper">
                      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon"
                          width="17"
                          height="17"
                          src="../img/icons/${eventType.type}.png"
                          alt="Event type icon"
                        >
                      </label>
                      <input
                        class="event__type-toggle  visually-hidden"
                        id="event-type-toggle-${id}"
                        type="checkbox">
                      <div class="event__type-list">
                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Event type</legend>
                          ${events}
                        </fieldset>
                      </div>
                    </div>`;
};

const generatePhoto = (photosList) => photosList
  .map((element) => `<img class="event__photo" src=${element.src} alt="Event photo">`).join('');

const createEditTemplate = (_state = {}, offers, destinations, selectedType) => {
  const { id, dates, destination, basePrice, isDisabled, isSaving, isDeleting, } = _state;
  const {start, finish} = dates;
  const directions = destinations.map((dest) => dest.name);
  const newPointList = directions.filter((element) => element !== destination.name);

  const getDeleteCancelButtonCaption = () => {
    if (isDeleting) {return 'Deleting...';}
    if (destination.id === null) {return 'Cancel';}
    return 'Delete';
  };

  return (
    `<li class="trip-events__item">
       <form class="event event--edit" action="#" method="post">
         <header class="event__header">
         ${generateEventTypeList(offers, id, selectedType)}
         <div class="event__field-group  event__field-group--destination">
           <label class="event__label  event__type-output" for="event-destination-${id}">
             ${selectedType.type}
           </label>
           <input
             class="event__input  event__input--destination"
             id="event-destination-${id}"
             type="text"
            name="event-destination"
             value="${destination.name ? he.encode(destination.name) : ''}"
             list="destination-list-${id}"
             ${isDisabled ? 'disabled' : ''}
             required
           >
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
          <input
            class="event__input  event__input--price"
            id="event-price-${id}"
            type="number"
            name="event-price"
            value="${basePrice}"
            ${isDisabled ? 'disabled' : ''}
            required
            min="0"
          >
        </div>
        <button
          class="event__save-btn  btn  btn--blue"
          type="submit"
          ${isDisabled ? 'disabled' : ''}>
          ${isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          class="event__reset-btn"
          type="reset"
          ${isDisabled ? 'disabled' : ''}>
          ${getDeleteCancelButtonCaption()}
        </button>
        ${destination.id !== null ?
      `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : '' }>
        <span class="visually-hidden">Open event</span>
       </button>` : ''}
     </header>
     <section class="event__details">
       ${generateOffersList(selectedType.offers, _state, isDisabled)}
       ${(destination.description || destination.pictures.length) ?
      `<section class="event__section  event__section--destination">
         <h3 class="event__section-title  event__section-title--destination">Destination</h3>
         ${destination.description ?
      `<p class="event__destination-description">${destination.description}</p>` : '' }
         ${destination.pictures.length > 0 ?
      `<div class="event__photos-container">
         <div class="event__photos-tape">
           ${generatePhoto(destination.pictures)}
         </div>
       </div>` : ''}
      </section>` : ''}
    </section>
  </form>
</li>`
  );
};

export default class EditFormView extends AbstractPointView {
  #startDatepicker = null;
  #endDatepicker = null;

  constructor(point,{offers, destinations}) {
    super({offers, destinations});
    this._state = EditFormView.parsePointToState(point);

    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  get selectedType() {
    return this.pointType(this._state.type);
  }

  get template() {
    return createEditTemplate(this._state, this.offers, this.destinations, this.selectedType);
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
    const editHandler = this.element.querySelector('.event__rollup-btn');
    if(editHandler){
      editHandler.addEventListener('click', this.#formClickHandler);}
  };

  #formClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #changeTypePoint = ( evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: evt.target.value,
        offers: []
      });
    }
  };

  #changeOffer = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__offer-checkbox')) {
      this._setState({
        offers: evt.target.checked
          ? [...this._state.offers, Number(evt.target.value)]
          : this._state.offers.filter(( item ) => item !== Number(evt.target.value)),
      });
    }
  };

  #changeDestination = (evt) => {
    evt.preventDefault();
    if (evt.target.value) {
      const destination = this.destinations.find((element) => element.name === evt.target.value) || BLANK_POINT.destination;
      this.updateElement({
        destination,
      });
      return;
    }
    this.updateElement(
      BLANK_POINT.destination,
    );
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
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditFormView.parseStateToPoint(this._state));
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
        start: userDate,
      }
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dates: {
        ...this._state.dates,
        finish: userDate,
      }
    });
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        maxDate: this._state.dates.finish,
        allowInput: true,
        defaultDate: this._state.dates.start,
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
        minDate: this._state.dates.start,
        allowInput: true,
        defaultDate: this._state.dates.finish,
        onChange: this.#endDateChangeHandler,
      }
    );
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
