import { UpdateType } from '../mock/const.js';
import {getСheckedOffers, getAllOffersByPoints, ucFirstLetter } from '../mock/util.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #destinationApiService = null;
  #offersApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor(pointsApiService, destinationApiService, offersApiService) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationApiService = destinationApiService;
    this.#offersApiService = offersApiService;
  }

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }


  get destinations () {
    return this.#destinations;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#offers = await this.#offersApiService.offers;
      this.#destinations = await this.#destinationApiService.destinations;
      this.#points = points.map(this.#adaptToClient);
      console.log(this.#points);
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
      throw err;
    }
    this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };

  getIdByDestination(destinationName) {
    const {id} = this.#destinations.find((it) => it.name === destinationName);
    return id;
  }

  getDestinationById(pointDestination){
    const destination = this.#destinations.find((it) => it.id === pointDestination);
    return destination;
  }


  #adaptToClient = (point) => {
    console.log({point});
    const typeOffers = getСheckedOffers(point, this.#offers);
    const adaptedPoint = Object.assign(
      point, {
        basePrice: point['base_price'],
        dates: {
          start: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
          finish: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
        },
        destination: this.destinations.find((destination) => destination.id === point.destination),
        type: {
          iconSrc: `../img/icons/${point.type}.png`,
          name: ucFirstLetter(point.type),
          offers:typeOffers,
        },
        offers: getAllOffersByPoints(point.offers, typeOffers)
      }
    );


    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    //console.log(point);

    return adaptedPoint;
  };
}
