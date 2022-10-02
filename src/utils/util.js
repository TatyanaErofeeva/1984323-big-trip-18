import { KEYS } from './const';

const isEscKey = (evt) => KEYS.ESCAPE.includes(evt.key);

const getSumElements = (elements) => {
  const sumElements = elements.reduce(
    (priceA, priceB) => priceA + priceB
  );
  return sumElements;
};

const getUpperCaseFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

export {getSumElements, getUpperCaseFirstLetter, isEscKey};
