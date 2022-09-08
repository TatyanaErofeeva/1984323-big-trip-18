import {getRandomInteger, getRandomArrayElement, getRandomArray} from './util.js';
import { FILTER_TYPE, OFFERS_LIST } from './const.js';
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

const typePoints = [ 'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'checkIn', 'sightseeng', 'restaurant' ];
const getpointOffers = () => getRandomArray(getRandomInteger(0, 5), Object.keys(OFFERS_LIST));

const ROUTE_POINT_TYPES = {
  taxi: {
    name: 'Taxi',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/taxi.png',
    price: getRandomInteger(2, 20) * 20,
  },
  bus: {
    name: 'Bus',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/bus.png',
    price: getRandomInteger(2, 20) * 20,
  },
  train: {
    name: 'Train',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/train.png',
    price: getRandomInteger(2, 20) * 20,
  },
  ship: {
    name: 'Ship',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/ship.png',
    price: getRandomInteger(2, 20) * 20,
  },
  drive: {
    name: 'Drive',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/drive.png',
    price: getRandomInteger(2, 20) * 20,
  },
  flight: {
    name: 'Flight',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/flight.png',
    price: getRandomInteger(2, 20) * 20,
  },
  checkIn: {
    name: 'Check-in',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/check-in.png',
    price: getRandomInteger(2, 20) * 20,
  },
  sightseeng: {
    name: 'Sightseeng',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/sightseeing.png',
    price: getRandomInteger(2, 20) * 20,
  },
  restaurant: {
    name: 'Restaurant',
    offers: getObjectsArray(OFFERS_LIST, getpointOffers()),
    iconSrc: '../img/icons/restaurant.png',
    price: getRandomInteger(2, 20) * 20,
  },
};

let id = 0;
const generatePoint = () => {
  //const destination = getRandomArrayElement(DESTINATIONS_ARRAY);
  const pointType = getRandomArrayElement(typePoints);
  const type = ROUTE_POINT_TYPES[pointType];
  const offersList = type['offers'];
  const typeOfStringOffers = offersList.map(({id}) => id);
  return {
    id: nanoid(),
    basePrice: getRandomInteger(10, 40),
    dates: generateDate(),
    destination: id++,
    type,
    offers: typeOfStringOffers,
    //description: getRandomArrayElement(DESCRIPTIONS),
    //photos: createPhotosArr(),
    isFavorite: Boolean(getRandomInteger()),
  };
};
export {generatePoint, filter, getObjectsArray, getpointOffers, ROUTE_POINT_TYPES};
