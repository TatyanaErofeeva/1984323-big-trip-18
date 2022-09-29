
import { isFutureDate, isPastDate } from './util.js';
import { FILTER_TYPE } from './const.js';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points.slice(),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dates.start)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isPastDate(point.dates.finish)),
};
const generateFilter = () => Object.keys(filter).map(
  (filterName) => ({
    name: filterName,
  }),
);

export {generateFilter, filter};
