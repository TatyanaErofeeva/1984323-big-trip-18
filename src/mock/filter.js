import { filter } from './data.js';

const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoint]) => ({
    name: filterName,
    count: filterPoint(points),
  }),
);
export {generateFilter};
