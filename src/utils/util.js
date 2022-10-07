import { KEYS } from './const';

const isEscKey = (evt) => KEYS.ESCAPE.includes(evt.key);

const getUpperCaseFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const convertSnakeToCamelCase = (str) =>
  str.toLowerCase().replace(/(_\w)/g, (k) => k[1]
    .toUpperCase())
    .replace('_', '');


const convertCamelToSnakeCase = (str) =>
  str.split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();


const convertObjectKeys = (point, convertfoo) => {
  const newObj = {};
  for(const key in point) {
    newObj[convertfoo(key)] = point[key];
  }
  return newObj;
};

export {getUpperCaseFirstLetter, isEscKey,convertCamelToSnakeCase, convertSnakeToCamelCase, convertObjectKeys};
