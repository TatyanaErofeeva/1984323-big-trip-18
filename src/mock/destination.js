import {getRandomInteger, getRandomArrayElement} from './util.js';
import { DESTINATIONS_ARRAY, DESCRIPTIONS, pictures } from './const.js';

let id = 0;
const generateCity = () => DESTINATIONS_ARRAY[id];

const createPhotosArr = () => {
  const count = getRandomInteger(1, 7);
  const src = [];
  for (let i = 0; i < count; i++) {
    src.push(pictures[i]);
  }
  return src;
};
const createDestination = () => ({
  id: id++,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: generateCity,
  photos: createPhotosArr()
});

export {createDestination, createPhotosArr};
