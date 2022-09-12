import {getRandomInteger, getRandomArrayElement, getRandomArray} from './util.js';
import { FILTER_TYPE, OFFERS_LIST} from './const.js';
import dayjs from 'dayjs';
import { isFutureDate, isPastDate } from './util.js';
import { nanoid } from 'nanoid';
import { DESTINATIONS} from './destination.js';

const getObjectsArray = (obj, MAX_NUMBER_ELEMENTS) => {
  const getPointOffers = () => getRandomArray(getRandomInteger(0, MAX_NUMBER_ELEMENTS), Object.keys(OFFERS_LIST));
  const keys = getPointOffers();
  const newArray = [];
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      newArray.push(obj[element]);
    }
  }
  return newArray;
};

let startTripDate = dayjs().add(0, 'day').startOf('date');

const generateDate = () => {
  const MAX_TRIP_TIME = 6;
  const tripTime = getRandomInteger(1, MAX_TRIP_TIME) * 30;
  const start = startTripDate;
  const finish = startTripDate.add(tripTime, 'minutes');
  startTripDate = finish;
  return {
    start:  start.toISOString(),
    finish: finish.toISOString()
  };
};

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points.slice(),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom, point.dateFrom)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo)),
};

const ROUTE_POINT_TYPES = {
  taxi: {
    name: 'Taxi',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/taxi.png',
  },
  bus: {
    name: 'Bus',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/bus.png',
  },
  train: {
    name: 'Train',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/train.png',
  },
  ship: {
    name: 'Ship',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/ship.png',
  },
  drive: {
    name: 'Drive',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/drive.png',
  },
  flight: {
    name: 'Flight',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/flight.png',
  },
  checkIn: {
    name: 'Check-in',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/check-in.png',
  },
  sightseeng: {
    name: 'Sightseeng',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/sightseeing.png',
  },
  restaurant: {
    name: 'Restaurant',
    offers: getObjectsArray(OFFERS_LIST, 5),
    iconSrc: '../img/icons/restaurant.png',
  },
};


const generatePoint = () => {
  const type = ROUTE_POINT_TYPES[getRandomArrayElement(Object.keys(ROUTE_POINT_TYPES))];
  const offersList = type.offers;
  const typeOfStringOffers = offersList.map(({id}) => id);
  const destinationObject = () => getRandomArrayElement(DESTINATIONS);

  return {
    id: nanoid(),
    basePrice: getRandomInteger(10, 40),
    dates: generateDate(),
    destination:destinationObject(),
    type,
    offers: typeOfStringOffers,
    isFavorite: Boolean(getRandomInteger()),
  };
};
export {generatePoint, filter, getObjectsArray, ROUTE_POINT_TYPES};
