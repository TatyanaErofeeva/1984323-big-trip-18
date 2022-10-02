import { KEYS } from './const';

const isEscKey = (evt) => KEYS.ESCAPE.includes(evt.key);

const getUpperCaseFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

export {getUpperCaseFirstLetter, isEscKey};
