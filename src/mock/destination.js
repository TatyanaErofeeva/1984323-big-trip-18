import { pictures, DESCRIPTIONS} from './const.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';

const DESTINATIONS_ARRAY = [
  'Amsterdam',
  'Geneva',
  'Tver',
  'Berlin',
  'Moscow',
];

const createPhotosArr = () => {
  const count = getRandomInteger(1, 7);
  const src = [];
  for (let i = 0; i < count; i++) {
    src.push(pictures[i]);
  }
  return src;
};

let id = 0;

const DESTINATIONS = {
  Amsterdam: {
    'id': id++,
    'description': getRandomArrayElement(DESCRIPTIONS),
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': createPhotosArr(),
        'description': getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  Geneva: {
    'id': id++,
    'description': getRandomArrayElement(DESCRIPTIONS),
    'name': 'Geneva',
    'pictures': [
      {
        'src': createPhotosArr(),
        'description': getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  Tver: {
    'id': id++,
    'description': getRandomArrayElement(DESCRIPTIONS),
    'name': 'Tver',
    'pictures': [
      {
        'src': createPhotosArr(),
        'description': getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  Berlin: {
    'id': id++,
    'description': getRandomArrayElement(DESCRIPTIONS),
    'name': 'Berlin',
    'pictures': [
      {
        'src': createPhotosArr(),
        'description': getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  Moscow: {
    'id': id++,
    'description': getRandomArrayElement(DESCRIPTIONS),
    'name': 'Moscow',
    'pictures': [
      {
        'src': createPhotosArr(),
        'description': getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
};

export {DESTINATIONS, DESTINATIONS_ARRAY};

