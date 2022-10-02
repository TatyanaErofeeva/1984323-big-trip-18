
import { isFutureDate, isPastDate } from './date.js';
import { FILTER_TYPE } from './const.js';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points.slice(),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dates.start)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isPastDate(point.dates.finish)),
};

export { filter};
