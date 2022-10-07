import { KEYS } from './const';

const isEscKey = (evt) => KEYS.ESCAPE.includes(evt.key);

const getUpperCaseFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const convertObjectToCamelCase = (point) => {
  const newObj = {};
  for(const key in point) {
    newObj[key.replace(/(_\w)/g, (k) => k[1].toUpperCase())] = point[key];
  }
  return newObj;
};

export {getUpperCaseFirstLetter, isEscKey, convertObjectToCamelCase};
