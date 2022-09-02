import {getRandomInteger, getRandomArrayElement} from './util.js';
import { DESTINATIONS_ARRAY, DESCRIPTIONS, OFFERS_LIST, ROUTE_POINT_TYPES } from './const.js';
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

const generatePoint = () => {
  const destination = getRandomArrayElement(DESTINATIONS_ARRAY);
  const pointType = getRandomArrayElement(Object.keys(ROUTE_POINT_TYPES));
  const type = ROUTE_POINT_TYPES[pointType];
  const offersList = type['offers'];
  const offersObjectList = getObjectsArray(OFFERS_LIST, offersList);
  return {
    id: nanoid(),
    basePrice: getRandomInteger(10, 40),
    dates: generateDate(),
    destination,
    type,
    offers: offersObjectList,
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: createPhotosArr(),
    isFavorite: Boolean(getRandomInteger()),
  };
};
export {generatePoint, filter};
