import { filter } from './data.js';

const generateFilter = () => Object.keys(filter).map(
  (filterName) => ({
    name: filterName,
  }),
);

export {generateFilter};
