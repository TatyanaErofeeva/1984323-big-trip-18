import {getRandomInteger, getRandomArrayElement, getRandomArray} from './util.js';
import { DESTINATIONS_ARRAY, DESCRIPTIONS, OFFERS_LIST } from './const.js';
import { FILTER_TYPE } from './const.js';
import dayjs from 'dayjs';
import { isFutureDate, isPastDate } from './util.js';
import { nanoid } from 'nanoid';

const getObjectsArray = (obj, keysArr) => {
  const newArray = [];
  if (keysArr.length > 0) {
    for (let i = 0; i < keysArr.length; i++) {
      const element = keysArr[i];
      newArray.push(obj[element]);
    }
  }
  return newArray;
};

const createPhotosArr = () => {
  const count = getRandomInteger(1, 9);
  const src = [];
  for (let i = 0; i < count; i++) {
    src.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return src;
};

let startTripDate = dayjs().add(0, 'day').startOf('date');

const generateDate = () => {
  const MAX_TRIP_TIME = 6;
  const tripTime = getRandomInteger(1, MAX_TRIP_TIME);
  const start = startTripDate;
  const finish = startTripDate.add(tripTime, 'days');
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

const typePoints = [ 'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant' ];
const getpointOffers = () => getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST));
const offersList = getpointOffers();

const ROUTE_POINT_TYPES = {
  taxi: {
    name: 'Taxi',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/taxi.png',
    price: getRandomInteger(2, 20) * 20,
  },
  bus: {
    name: 'Bus',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/bus.png',
    price: getRandomInteger(2, 20) * 20,
  },
  train: {
    name: 'Train',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/train.png',
    price: getRandomInteger(2, 20) * 20,
  },
  ship: {
    name: 'Ship',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/ship.png',
    price: getRandomInteger(2, 20) * 20,
  },
  drive: {
    name: 'Drive',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/drive.png',
    price: getRandomInteger(2, 20) * 20,
  },
  flight: {
    name: 'Flight',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/flight.png',
    price: getRandomInteger(2, 20) * 20,
  },
  checkIn: {
    name: 'Check-in',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/check-in.png',
    price: getRandomInteger(2, 20) * 20,
  },
  sightseeng: {
    name: 'Sightseeng',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/sightseeing.png',
    price: getRandomInteger(2, 20) * 20,
  },
  restaurant: {
    name: 'Restaurant',
    offers: getObjectsArray(OFFERS_LIST, offersList),
    iconSrc: '../img/icons/restaurant.png',
    price: getRandomInteger(2, 20) * 20,
  },
};

const typeoffers = getObjectsArray(OFFERS_LIST, offersList);
const typeOfStringOffers = typeoffers.map(({id}) => id);

const generatePoint = () => {
  const destination = getRandomArrayElement(DESTINATIONS_ARRAY);
  const pointType = getRandomArrayElement(typePoints);
  const type = ROUTE_POINT_TYPES[pointType];
  return {
    id: nanoid(),
    basePrice: getRandomInteger(10, 40),
    dates: generateDate(),
    destination,
    type,
    offers: typeOfStringOffers,
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: createPhotosArr(),
    isFavorite: Boolean(getRandomInteger()),
  };
};
export {generatePoint, filter, getObjectsArray, getpointOffers, ROUTE_POINT_TYPES};
