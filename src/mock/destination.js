import { pictures, DESCRIPTIONS} from './const.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';

const MIN_PICS_COUNT = 1;
const MAX_PICS_COUNT = 5;

const createPhotosArr = () => {
  const count = getRandomInteger(1, 7);
  const src = [];
  for (let i = 0; i < count; i++) {
    src.push(pictures[i]);
  }
  return src;
};

const createPhotoItems = () => (
  {
    src: getRandomArrayElement(createPhotosArr()),
    description: getRandomArrayElement(DESCRIPTIONS)
  }
);

let id = 1;

const DESTINATIONS = [
  {
    id: id++,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Amsterdam',
    pictures: Array.from({length: getRandomInteger(MIN_PICS_COUNT, MAX_PICS_COUNT)}, () => createPhotoItems())
  },
  {
    id: id++,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Geneva',
    pictures: Array.from({length: getRandomInteger(MIN_PICS_COUNT, MAX_PICS_COUNT)}, () => createPhotoItems())
  },
  {
    id: id++,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Tver',
    pictures: Array.from({length: getRandomInteger(MIN_PICS_COUNT, MAX_PICS_COUNT)}, () => createPhotoItems())
  },
  {
    id: id++,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Berlin',
    pictures: Array.from({length: getRandomInteger(MIN_PICS_COUNT, MAX_PICS_COUNT)}, () => createPhotoItems())
  },
  {
    id: id++,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Moscow',
    pictures: Array.from({length: getRandomInteger(MIN_PICS_COUNT, MAX_PICS_COUNT)}, () => createPhotoItems())
  },
];

const directions = DESTINATIONS.map(({name}) => name);

export {DESTINATIONS, directions};

